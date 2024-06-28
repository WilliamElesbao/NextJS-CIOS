'use server';

import { prisma } from '@/services/db/prisma';
import { EquipmentsType, ReasonsType } from '@prisma/client';
import { writeFile } from 'fs/promises';
import { revalidatePath } from 'next/cache';
import { join } from 'path';
import { RecordForm } from './definitions';

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

// records
export async function createRecord(formData: RecordForm) {
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
        createdById: 'clxuzjx5r00001w6sg3l7o33h', // william - Pegar user da sessão
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
    }));

    const bindEquipmentToRecord = await prisma.equipment.createMany({
      data: equipmentsData,
    });

    const files: File[] = formData.attachments.getAll(
      'files',
    ) as unknown as File[];

    if (files.length !== 0) {
      const attachmentPaths: string[] = [];

      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const path = join(
          '/home/williamelesbao/dev/tm-cios/public/',
          'attachments',
          `${new Date().toISOString()}-${file.name}`,
        );
        await writeFile(path, buffer);
        console.log(`open ${path} to see the uploaded file`);
        attachmentPaths.push(path);
      }

      for (const path of attachmentPaths) {
        await prisma.attachment.create({
          data: {
            filename: path,
            Record: {
              connect: {
                id: createRecord.id,
              },
            },
          },
        });
      }
    }

    // logs
    console.log(createRecord);
    console.log(createRecord.id);
    console.log(bindEquipmentToRecord);

    revalidatePath('/cios/records');
    return {
      message: 'Registro criado',
      status: true,
    };
  } catch (err) {
    console.log(err);
    return {
      message: 'Erro ao criar o registro',
      status: false,
    };
  }
}
