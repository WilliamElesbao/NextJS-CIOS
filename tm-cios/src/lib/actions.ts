'use server';

import { auth } from '@/services/auth/auth';
import { prisma } from '@/services/db/prisma';
import { EquipmentsType, ReasonsType } from '@prisma/client';
import fs from 'fs';
import { writeFile } from 'fs/promises';
import { revalidatePath } from 'next/cache';
import path, { join } from 'path';
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
  const session = await auth();

  let userId = formData.record.deliveredBy;

  const findUser = await prisma.worker.findUnique({
    where: {
      id: formData.record.deliveredBy,
    },
  });

  if (!findUser) {
    const supervisor = await prisma.worker.findFirst({
      select: {
        name: true,
      },
      where: {
        id: formData.record.supervisors!,
      },
    });

    if (supervisor) {
      const newUser = await prisma.worker.create({
        data: {
          name: formData.record.deliveredBy,
          status: 'Ativo',
          registration: Math.random().toString(36).substring(2, 12),
          cc: formData.record.costCenter,
          manager: formData.record.manager,
          supervisor: supervisor.name,
        },
      });
      userId = newUser.id;
    }
  }

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

  // Filter equipments that are already associated with another record
  const unregistrableEquipments = equipmentsArray.filter((equipment) =>
    existingEquipments.some((existingEquipment) => {
      const isSameSerialOrPatrimony =
        existingEquipment.serialNumber === equipment.serialNumber ||
        existingEquipment.patrimonyNumber === equipment.patrimonyId;
      const isSameBorrower =
        existingEquipment.Record.borrowerId === formData.record.borrower;
      const isAlreadyAssociated = existingEquipment.isAssociated;

      if (isSameSerialOrPatrimony && isAlreadyAssociated && !isSameBorrower) {
        console.log(
          `Equipment with serial: ${equipment.serialNumber} or patrimony: ${equipment.patrimonyId} is already associated with another record`,
        );
      } else if (
        isSameSerialOrPatrimony &&
        isAlreadyAssociated &&
        isSameBorrower
      ) {
        console.log(
          `Equipment with serial: ${equipment.serialNumber} or patrimony: ${equipment.patrimonyId} is already associated with the same borrower, updating status`,
        );
      }

      return isSameSerialOrPatrimony && isAlreadyAssociated && !isSameBorrower;
    }),
  );

  if (unregistrableEquipments.length > 0) {
    // Generate error messages for equipments that cannot be registered
    const errorMessages = unregistrableEquipments.map((equipment) => {
      return `Equipamento com serial: ${equipment.serialNumber} ou patrimônio: ${equipment.patrimonyId} já está associado a outro registro.`;
    });
    return {
      message: errorMessages.join('\n'),
      status: false,
    };
  }

  try {
    const createRecord = await prisma.record.create({
      data: {
        deliveredByWorkerId: userId,
        deliveryAt: formData.record.date,
        deliveryTime: formData.record.date,
        borrowerId: formData.record.borrower,
        costCenter: formData.record.costCenter,
        responsibleManager: formData.record.manager,
        ticketCode: formData.record.ticketNumber,
        generalObservations: formData.record.notes,
        shift: formData.record.shifts,
        createdById: session?.user?.id!,
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
      isAssociated:
        createRecord.borrowerId !== 'clyfvng4q0000w6beh8vk96zd' ? true : false, // If the borrowerId is TECNOLOGIA DA INFORMAÇÃO, then isAssociated should be false.
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
        const extension = file.name.split('.').pop();
        const filename = `${Math.random()
          .toString(36)
          .substring(2, 15)}${extension}`;
        const path = join('public/attachments', filename);

        await writeFile(path, buffer);
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
    await sendBookingEmail(createRecord.id);
    return {
      message: 'Registro criado com sucesso!',
      status: true,
    };
  } catch (err) {
    console.log(err);
    console.log('Erro ao criar o registro!');
    return {
      message: 'Erro ao criar o registro!',
      status: false,
    };
  }
}
export async function updateEquipmentFlowStatus(
  newFlowStatus: string,
  equipmentId: number,
) {
  const session = await auth();
  try {
    const updatedEquipment = await prisma.equipment.update({
      where: { id: equipmentId },
      data: { flow: newFlowStatus },
    });

    const updatedRecord = await prisma.record.update({
      where: { id: updatedEquipment.recordId },
      data: {
        updatedAt: new Date(),
        updatedById: session?.user?.id,
      },
    });

    revalidatePath('/cios/workers');

    return {
      message: 'Status atualizado.',
      status: true,
      updatedEquipment,
    };
  } catch (error) {
    console.error('Erro ao atualizar o status do equipamento:', error);
    return {
      message: 'Error updating equipment association status.',
      status: false,
    };
  }
}
export async function updateEquipmentConditionStatus(
  newConditionStatus: string,
  equipmentId: number,
) {
  const session = await auth();
  try {
    const updatedEquipment = await prisma.equipment.update({
      where: { id: equipmentId },
      data: { equipmentCondition: newConditionStatus },
    });

    const updatedRecord = await prisma.record.update({
      where: { id: updatedEquipment.recordId },
      data: {
        updatedAt: new Date(),
        updatedById: session?.user?.id,
      },
    });

    revalidatePath('/cios/workers');

    return {
      message: 'Status atualizado.',
      status: true,
      updatedEquipment,
    };
  } catch (error) {
    console.error('Erro ao atualizar o status do equipamento:', error);
    return {
      message: 'Error updating equipment association status.',
      status: false,
    };
  }
}
export async function updateEquipmentAssociationStatus(
  equipmentId: number,
  newAssociationStatus: boolean,
  serialNumber: string,
  patrimonyId: string,
  userId: string,
) {
  const session = await auth();
  try {
    const existingAssociation = await prisma.equipment.findMany({
      where: {
        OR: [{ serialNumber: serialNumber }, { patrimonyNumber: patrimonyId }],
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
        message: `Esse equipamento com o serial ${serialNumber} ou patrimonio ${patrimonyId} já está associado há outro colaborador.`,
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
        updatedById: session?.user?.id,
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

// users
export async function updateUserImage(
  userId: string | undefined,
  image: string,
) {
  if (!userId) {
    return;
  }

  const currentImage = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      image: true,
    },
  });

  if (currentImage?.image === image) {
    return;
  }

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        image,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

// get image
export async function getImage(filename: string) {
  const filePath = path.join(process.cwd(), 'public/attachments', filename);

  if (!fs.existsSync(filePath)) {
    console.log('File not found');
  }

  const fileBuffer = fs.readFileSync(filePath);
  return `data:image/jpeg;base64,${fileBuffer.toString('base64')}`;
}

export async function updateUserPermission(userId: string, role: string) {
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role: role,
      },
    });
  } catch (error) {
    console.error(error);
  }
  revalidatePath('/cios/settings');
}
