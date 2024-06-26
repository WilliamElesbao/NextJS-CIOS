'use server';

import { prisma } from '@/services/db/prisma';
import { revalidatePath } from 'next/cache';

export async function createNewEquipment(formData: any) {
  const findEquipment = await prisma.equipmentsType.findUnique({
    where: {
      name: formData.equipmentName,
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
        name: formData.equipmentName,
        description: formData.equipmentDescription,
      },
    });

    revalidatePath('/cios/records/new');
    return {
      message: 'Equipamento cadastrado com sucesso',
      status: true,
    };
  }
}
