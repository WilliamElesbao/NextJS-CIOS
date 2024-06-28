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

// Records by Borrower ID
export async function fetchByBorrowerIdAllRecords(userId: number) {
  try {
    const records = await prisma.worker.findMany({
      where: {
        id: userId,
      },
      include: {
        BorrowedRecords: {
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
          },
        },
      },
    });

    return records;
  } catch (error) {
    console.error('Error fetching records by user ID:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
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

    console.log(records);

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
    where: {
      flow: 'checkIn',
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
