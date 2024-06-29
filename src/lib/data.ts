import { prisma } from '@/services/db/prisma';

// settings
export async function fetchEquipments() {
  const equipments = await prisma.equipmentsType.findMany({
    orderBy: {
      name: 'asc',
    },
  });
  return equipments;
}

export async function fetchReasons() {
  const reasons = await prisma.reasonsType.findMany({
    orderBy: {
      name: 'asc',
    },
  });
  return reasons;
}

// workers
export async function fetchWorkers() {
  const workers = await prisma.worker.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  return workers;
}

export async function countTotalRecordsByUser() {
  const totalRecordsByUser = await prisma.record.groupBy({
    by: ['borrowerId'],
    _count: {
      id: true,
    },
  });

  const workerIds = totalRecordsByUser.map((record) => record.borrowerId);
  const workers = await prisma.worker.findMany({
    where: {
      id: { in: workerIds },
    },
    select: {
      id: true,
      name: true,
      email: true,
      status: true,
    },
  });

  const result = totalRecordsByUser.map((record) => {
    const worker = workers.find((worker) => worker.id === record.borrowerId);
    return {
      userId: record.borrowerId,
      totalRecords: record._count.id,
      name: worker?.name || 'Unknown',
      email: worker?.email || 'Unknown',
      status: worker?.status || 'Unknown',
    };
  });

  return result;
}

// Records by Borrower ID
export async function fetchByBorrowerIdAllRecords(userId: number) {
  console.log(userId);
  try {
    const records = await prisma.record.findMany({
      where: {
        borrowerId: userId,
      },
      include: {
        Equipment: {
          include: {
            EquipmentType: true,
            Record: true,
          },
        },
        Attachment: true,
        CreatedBy: true,
        Borrower: true,
        DeliveredBy: true,
      },
    });
    console.log(records);
    return records;
  } catch (error) {
    console.error('Error fetching records:', error);
    throw new Error('Error fetching records');
  }
}

export async function fetchAllRecords() {
  try {
    const records = await prisma.record.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        Equipment: {
          select: {
            entryType: true,
            description: true,
            status: true,
          },
        },
        Attachment: {
          select: {
            filename: true,
          },
        },
        Borrower: {
          select: {
            name: true,
            email: true,
            cc: true,
            manager: true,
            status: true,
          },
        },
        CreatedBy: {
          select: {
            name: true,
            email: true,
          },
        },
        DeliveredBy: {
          select: {
            name: true,
            email: true,
            cc: true,
            manager: true,
            status: true,
          },
        },
      },
    });

    return records;
  } catch (error) {
    console.error('Error fetching all records:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function fetchAllCheckedInEquipments() {
  const equipmentsHasBeenCheckedIn = await prisma.equipment.findMany({
    select: {
      description: true,
      EquipmentType: {
        select: {
          name: true,
          description: true,
        },
      },
      flow: true,
      equipmentCondition: true,
      Record: {
        select: {
          id: true,
          ticketCode: true,

          Borrower: {
            select: {
              name: true,
              email: true,
              cc: true,
              manager: true,
              status: true,
            },
          },
          Attachment: {
            select: {
              filename: true,
            },
          },
        },
      },
    },
    where: {
      flow: 'checkIn',
    },
  });
  console.log(equipmentsHasBeenCheckedIn);
  return equipmentsHasBeenCheckedIn;
}

export async function fetchAllCheckedOutEquipments() {
  const equipmentsHasBeenCheckedIn = await prisma.equipment.findMany({
    where: {
      flow: 'checkOut',
    },
    select: {
      EquipmentType: {
        select: {
          name: true,
          description: true,
        },
      },
      flow: true,
      equipmentCondition: true,
      Record: {
        select: {
          id: true,
          ticketCode: true,
          Borrower: {
            select: {
              name: true,
              email: true,
              cc: true,
              manager: true,
              status: true,
            },
          },
          Attachment: {
            select: {
              filename: true,
            },
          },
        },
      },
    },
  });
  return equipmentsHasBeenCheckedIn;
}

export async function fetchAllObsoleteEquipments() {
  const obsoleteEquipments = await prisma.equipment.findMany({
    where: {
      // flow: 'checkIn',
      equipmentCondition: 'Descarte',
    },
    include: {
      EquipmentType: {
        select: {
          name: true,
          description: true,
        },
      },
      Record: {
        select: {
          ticketCode: true,
          Borrower: {
            select: {
              name: true,
              email: true,
              cc: true,
              manager: true,
              status: true,
            },
          },
          Attachment: {
            select: {
              filename: true,
            },
          },
        },
      },
    },
  });

  return obsoleteEquipments;
}
