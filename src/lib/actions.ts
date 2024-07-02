'use server';

import { prisma } from '@/services/db/prisma';
import { EquipmentsType, ReasonsType } from '@prisma/client';
import { writeFile } from 'fs/promises';
import { revalidatePath } from 'next/cache';
import { join } from 'path';
import { RecordForm } from './definitions';
import { sendBookingEmail } from './email-sender';

// settings
export async function createNewEquipment(
  formData: Pick<EquipmentsType, 'name' | 'description'>,
) {
  const findEquipment = await prisma.equipmentsType.findUnique({
    where: {
      name: formData.name,
    },
  });

  if (findEquipment) {
    return {
      message: 'Equipamento já cadastrado',
      status: false,
    };
  } else {
    await prisma.equipmentsType.create({
      data: {
        name: formData.name,
        description: formData.description,
      },
    });

    revalidatePath('/cios/records/new');
    return {
      message: 'Equipamento cadastrado com sucesso',
      status: true,
    };
  }
}
export async function editEquipment(
  formData: EquipmentsType,
): Promise<{ message: string; status: boolean }> {
  const findEquipment = await prisma.equipmentsType.findUnique({
    where: {
      name: formData.name,
      description: formData.description,
    },
  });

  if (findEquipment) {
    return {
      message: 'Equipamento já cadastrado',
      status: false,
    };
  }

  const updateEquipment = await prisma.equipmentsType.update({
    where: {
      id: formData.id,
    },
    data: {
      name: formData.name,
      description: formData.description,
    },
  });

  revalidatePath('/cios/settings/equipments');
  return {
    message: 'Equipamento atualizado com sucesso',
    status: true,
  };
}
export async function deleteEquipment(
  id: string,
): Promise<{ message: string; status: boolean }> {
  const deleteEquipment = await prisma.equipmentsType.delete({
    where: {
      id: id,
    },
  });

  revalidatePath('/cios/settings/equipments');
  return {
    message: 'Equipamento deletado com sucesso',
    status: true,
  };
}

// reasons
export async function createNewReason(
  formData: Pick<ReasonsType, 'name' | 'description'>,
) {
  const findReason = await prisma.reasonsType.findUnique({
    where: {
      name: formData.name,
    },
  });

  if (findReason) {
    return {
      message: 'Motivo já cadastrado',
      status: false,
    };
  } else {
    await prisma.reasonsType.create({
      data: {
        name: formData.name,
        description: formData.description,
      },
    });

    revalidatePath('/cios/records/new');
    return {
      message: 'Motivo cadastrado com sucesso',
      status: true,
    };
  }
}
export async function editReason(
  formData: ReasonsType,
): Promise<{ message: string; status: boolean }> {
  const findReason = await prisma.reasonsType.findUnique({
    where: {
      name: formData.name,
      description: formData.description,
    },
  });

  if (findReason) {
    return {
      message: 'Motivo já cadastrado',
      status: false,
    };
  }

  const updateReason = await prisma.reasonsType.update({
    where: {
      id: formData.id,
    },
    data: {
      name: formData.name,
      description: formData.description,
    },
  });

  revalidatePath('/cios/settings/reasons');
  return {
    message: 'Motivo atualizado com sucesso',
    status: true,
  };
}
export async function deleteReason(
  id: number,
): Promise<{ message: string; status: boolean }> {
  const deleteReason = await prisma.reasonsType.delete({
    where: {
      id: id,
    },
  });

  revalidatePath('/cios/settings/reasons');
  return {
    message: 'Motivo deletado com sucesso',
    status: true,
  };
}

// records
export async function createRecord(formData: RecordForm) {
  const { equipmentsArray } = formData.record;

  // Busca por equipamentos já cadastrados com o mesmo número de série ou patrimônio
  const existingEquipments = await prisma.equipment.findMany({
    where: {
      OR: equipmentsArray.map((equipment) => ({
        OR: [
          { serialNumber: equipment.serialNumber },
          { patrimonyNumber: equipment.patrimonyId },
        ],
      })),
    },
    include: {
      Record: {
        include: {
          Borrower: true,
        },
      },
    },
  });

  // Filtra equipamentos que não podem ser cadastrados baseado nas regras definidas
  const unregistrableEquipments = equipmentsArray.filter((equipment) =>
    existingEquipments.some((existingEquipment) => {
      const isSameSerialOrPatrimony =
        existingEquipment.serialNumber === equipment.serialNumber ||
        existingEquipment.patrimonyNumber === equipment.patrimonyId;
      const isDifferentEntryType =
        existingEquipment.entryType !== equipment.status;
      const isSameBorrower =
        existingEquipment.Record.borrowerId ===
        Number(formData.record.borrower);

      return (
        isSameSerialOrPatrimony && (!isDifferentEntryType || !isSameBorrower)
      );
    }),
  );

  if (unregistrableEquipments.length > 0) {
    // Gera mensagens de erro para equipamentos que não podem ser cadastrados
    const errorMessages = unregistrableEquipments.map((equipment) => {
      return `Equipamento com serial: ${equipment.serialNumber} ou patrimônio: ${equipment.patrimonyId} já está cadastrado e não pode ser registrado novamente sob as mesmas condições.`;
    });
    return {
      message: errorMessages.join('\n'),
      status: false,
    };
  }

  try {
    const createRecord = await prisma.record.create({
      data: {
        deliveredByWorkerId: Number(formData.record.deliveredBy),
        deliveryAt: formData.record.date,
        deliveryTime: formData.record.date,
        borrowerId: Number(formData.record.borrower),
        costCenter: formData.record.costCenter,
        responsibleManager: formData.record.manager,
        ticketCode: formData.record.ticketNumber,
        generalObservations: formData.record.notes,
        shift: formData.record.shifts,
        createdById: 'clxuzjx5r00001w6sg3l7o33h', // TODO: user from session
      },
    });

    const equipmentsData = formData.record.equipmentsArray.map((equipment) => ({
      recordId: createRecord.id,
      equipmentType: equipment.equipmentType,
      description: equipment.description,
      serialNumber: equipment.serialNumber,
      patrimonyNumber: equipment.patrimonyId,
      equipmentCondition: equipment.condition,
      status: null,
      flow: equipment.status,
      entryType: equipment.reason ?? null,
      observations: equipment.relatedNote,
      isAssociated: true,
    }));

    const bindEquipmentToRecord = await prisma.equipment.createMany({
      data: equipmentsData,
    });

    const files: File[] = formData.attachments.getAll(
      'files',
    ) as unknown as File[];

    if (files.length !== 0) {
      const attachmentFilenames: string[] = [];

      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const filename = `${new Date().toISOString()}-${file.name}`;
        const path = join(
          '/home/williamelesbao/dev/tm-cios/public/',
          'attachments',
          filename,
        );
        await writeFile(path, buffer);
        console.log(`open ${path} to see the uploaded file`);
        attachmentFilenames.push(filename);
      }

      for (const filename of attachmentFilenames) {
        await prisma.attachment.create({
          data: {
            filename: filename,
            Record: {
              connect: {
                id: createRecord.id,
              },
            },
          },
        });
      }
    }

    revalidatePath('/cios/records');
    // await sendBookingEmail(createRecord.id);
    return {
      message: 'Record created successfully',
      status: true,
    };
  } catch (err) {
    console.log(err);
    return {
      message: 'Error creating record',
      status: false,
    };
  }
}

export async function updateEquipmentAssociationStatus(
  equipmentId: number,
  newAssociationStatus: boolean,
  serialNumber: string,
  patrimonyId: string,
  userId: number,
) {
  try {
    const existingAssociation = await prisma.equipment.findMany({
      where: {
        serialNumber: serialNumber,
        patrimonyNumber: patrimonyId,
        isAssociated: true,
      },
      include: {
        Record: true,
      },
    });

    if (
      existingAssociation.length > 0 &&
      existingAssociation[0].Record.borrowerId !== userId
    ) {
      return {
        message: 'Equipment is already associated with another user.',
        status: false,
      };
    }

    const updatedEquipment = await prisma.equipment.update({
      where: { id: equipmentId },
      data: { isAssociated: newAssociationStatus },
    });

    const updatedRecord = await prisma.record.update({
      where: { id: updatedEquipment.recordId },
      data: {
        updatedAt: new Date(),
        updatedById: 'clxuzjx5r00001w6sg3l7o33h',
      },
    });

    revalidatePath('/cios/workers');

    return {
      message: 'Status atualizado.',
      status: true,
      updatedEquipment,
    };
  } catch (error) {
    console.error('Error updating equipment association status:', error);
    return {
      message: 'Error updating equipment association status.',
      status: false,
    };
  }
}
