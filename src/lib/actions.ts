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

// export async function createRecord(formData: RecordForm) {
//   const { equipmentsArray } = formData.record;

//   const alreadyAssignedEquipments = await prisma.equipment.findMany({
//     where: {
//       OR: equipmentsArray.flatMap((equipment) => [
//         { serialNumber: equipment.serialNumber },
//         { patrimonyNumber: equipment.patrimonyId },
//       ]),
//     },
//   });

//   console.log(alreadyAssignedEquipments);

//   if (alreadyAssignedEquipments.length > 0) {
//     const unregistrableEquipments = equipmentsArray.filter((equipment) =>
//       alreadyAssignedEquipments.some(
//         (assignedEquipment) =>
//           assignedEquipment.serialNumber === equipment.serialNumber ||
//           assignedEquipment.patrimonyNumber === equipment.patrimonyId,
//       ),
//     );

//     const errorMessages = unregistrableEquipments.map((equipment) => {
//       const conflicts = alreadyAssignedEquipments.filter(
//         (assignedEquipment) =>
//           assignedEquipment.serialNumber === equipment.serialNumber ||
//           assignedEquipment.patrimonyNumber === equipment.patrimonyId,
//       );

//       return conflicts
//         .map((conflict) => {
//           const fields = [];
//           if (conflict.serialNumber === equipment.serialNumber) {
//             fields.push(`serial: ${equipment.serialNumber}`);
//           }
//           if (conflict.patrimonyNumber === equipment.patrimonyId) {
//             fields.push(`patrimony: ${equipment.patrimonyId}`);
//           }
//           return `${fields.join(
//             ' and ',
//           )} is already assigned to another record.`;
//         })
//         .join('\n');
//     });

//     return {
//       message: errorMessages.join('\n'),
//       status: false,
//     };
//   }

//   try {
//     const createRecord = await prisma.record.create({
//       data: {
//         deliveredByWorkerId: Number(formData.record.deliveredBy),
//         deliveryAt: formData.record.date,
//         deliveryTime: formData.record.date,
//         borrowerId: Number(formData.record.borrower),
//         costCenter: formData.record.costCenter,
//         responsibleManager: formData.record.manager,
//         ticketCode: formData.record.ticketNumber,
//         generalObservations: formData.record.notes,
//         shift: formData.record.shifts,
//         createdById: 'clxuzjx5r00001w6sg3l7o33h', // william - Pegar user da sessão
//       },
//     });

//     const equipmentsData = formData.record.equipmentsArray.map((equipment) => ({
//       recordId: createRecord.id,
//       equipmentType: equipment.equipmentType,
//       description: equipment.description,
//       serialNumber: equipment.serialNumber,
//       patrimonyNumber: equipment.patrimonyId,
//       equipmentCondition: equipment.condition,
//       status: null,
//       flow: equipment.status,
//       entryType: equipment.reason ?? null,
//       observations: equipment.relatedNote,
//     }));

//     const bindEquipmentToRecord = await prisma.equipment.createMany({
//       data: equipmentsData,
//     });

//     const files: File[] = formData.attachments.getAll(
//       'files',
//     ) as unknown as File[];

//     if (files.length !== 0) {
//       const attachmentFilenames: string[] = [];

//       for (const file of files) {
//         const bytes = await file.arrayBuffer();
//         const buffer = Buffer.from(bytes);

//         const filename = `${new Date().toISOString()}-${file.name}`;
//         const path = join(
//           '/home/williamelesbao/dev/tm-cios/public/',
//           'attachments',
//           filename,
//         );
//         await writeFile(path, buffer);
//         console.log(`open ${path} to see the uploaded file`);
//         attachmentFilenames.push(filename);
//       }

//       for (const filename of attachmentFilenames) {
//         await prisma.attachment.create({
//           data: {
//             filename: filename,
//             Record: {
//               connect: {
//                 id: createRecord.id,
//               },
//             },
//           },
//         });
//       }
//     }

//     // logs
//     console.log(createRecord);
//     console.log(createRecord.id);
//     console.log(bindEquipmentToRecord);

//     revalidatePath('/cios/records');
//     return {
//       message: 'Registro criado',
//       status: true,
//     };
//   } catch (err) {
//     console.log(err);
//     return {
//       message: 'Erro ao criar o registro',
//       status: false,
//     };
//   }
// }

export async function createRecord(formData: RecordForm) {
  const { equipmentsArray } = formData.record;

  // Query to check if any equipment is already assigned to a borrower with status other than "demitido"
  const alreadyAssignedEquipments = await prisma.equipment.findMany({
    where: {
      OR: equipmentsArray.flatMap((equipment) => [
        {
          serialNumber: equipment.serialNumber,
          Record: {
            Borrower: {
              status: {
                not: 'demitido',
              },
            },
          },
        },
        {
          patrimonyNumber: equipment.patrimonyId,
          Record: {
            Borrower: {
              status: {
                not: 'demitido',
              },
            },
          },
        },
      ]),
    },
    include: {
      Record: {
        include: {
          Borrower: true,
        },
      },
    },
  });

  console.log(alreadyAssignedEquipments);

  if (alreadyAssignedEquipments.length > 0) {
    const unregistrableEquipments = equipmentsArray.filter((equipment) =>
      alreadyAssignedEquipments.some(
        (assignedEquipment) =>
          assignedEquipment.serialNumber === equipment.serialNumber ||
          assignedEquipment.patrimonyNumber === equipment.patrimonyId,
      ),
    );

    const errorMessages = unregistrableEquipments.map((equipment) => {
      const conflicts = alreadyAssignedEquipments.filter(
        (assignedEquipment) =>
          assignedEquipment.serialNumber === equipment.serialNumber ||
          assignedEquipment.patrimonyNumber === equipment.patrimonyId,
      );

      return conflicts
        .map((conflict) => {
          const fields = [];
          if (conflict.serialNumber === equipment.serialNumber) {
            fields.push(`serial: ${equipment.serialNumber}`);
          }
          if (conflict.patrimonyNumber === equipment.patrimonyId) {
            fields.push(`patrimony: ${equipment.patrimonyId}`);
          }
          return `${fields.join(
            ' and ',
          )} is already assigned to another record.`;
        })
        .join('\n');
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
        createdById: 'clxuzjx5r00001w6sg3l7o33h', // Retrieve user from session
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

    // Logs
    console.log(createRecord);
    console.log(createRecord.id);
    console.log(bindEquipmentToRecord);

    revalidatePath('/cios/records');
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
