import { prisma } from '@/services/db/prisma';

export async function fetchEquipments() {
  const equipments = await prisma.equipmentsType.findMany({
    orderBy: {
      name: 'asc',
    },
  });
  return equipments;
}

export async function fetchWorkers() {
  const workers = await prisma.worker.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  return workers;
}

