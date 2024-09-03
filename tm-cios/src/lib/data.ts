import { auth } from '@/services/auth/auth';
import { prisma } from '@/services/db/prisma';
import { EquipmentsType } from '@prisma/client';
import { Session } from 'next-auth';
import { ExtendsRecords, UserSelect } from './definitions';

export async function fetchEquipments(): Promise<EquipmentsType[]> {
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
      registration: true,
      name: true,
      email: true,
      status: true,
    },
  });

  const result = totalRecordsByUser.map((record) => {
    const worker = workers.find((worker) => worker.id === record.borrowerId);
    return {
      userId: record.borrowerId,
      registration: worker?.registration || 'Unknown',
      totalRecords: record._count.id,
      name: worker?.name || 'Unknown',
      email: worker?.email || 'Unknown',
      status: worker?.status || 'Unknown',
    };
  });

  return result;
}

export async function fetchByBorrowerIdAllRecords(
  userId: string,
): Promise<ExtendsRecords[]> {
  try {
    const records = await prisma.record.findMany({
      where: {
        borrowerId: userId,
      },
      orderBy: {
        createdAt: 'desc',
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
        UpdatedBy: true,
      },
    });
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
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      description: true,
      isAssociated: true,
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
          createdAt: true,

          Borrower: {
            select: {
              id: true,
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
  return equipmentsHasBeenCheckedIn;
}

export async function fetchAllCheckedOutEquipments() {
  const equipmentsHasBeenCheckedIn = await prisma.equipment.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    where: {
      flow: 'checkOut',
    },
    select: {
      description: true,
      isAssociated: true,
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
          createdAt: true,
          Borrower: {
            select: {
              id: true,
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
    orderBy: {
      createdAt: 'desc',
    },
    where: {
      // flow: 'checkIn',
      equipmentCondition: 'Descarte',
    },
    select: {
      description: true,
      isAssociated: true,
      EquipmentType: {
        select: {
          name: true,
          description: true,
        },
      },
      flow: true,
      equipmentCondition: true,
      patrimonyNumber: true,
      Record: {
        select: {
          id: true,
          ticketCode: true,
          createdAt: true,
          
          Borrower: {
            select: {
              id: true,
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

export async function findAllRecords() {
  return await prisma.record.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      CreatedBy: true,
      UpdatedBy: true,
      Borrower: true,
      DeliveredBy: true,
      Attachment: true,
      Equipment: {
        include: {
          EquipmentType: true,
        },
      },
    },
  });
}

export async function fetchLastRecord(): Promise<ExtendsRecords | null> {
  const lastRecord = await prisma.record.findFirst({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      Equipment: {
        include: {
          EquipmentType: true,
        },
      },
      CreatedBy: true,
      Borrower: true,
      DeliveredBy: true,
      Attachment: true,
    },
  });

  return lastRecord;
}

export async function fetchLastFiveRecords(): Promise<ExtendsRecords[]> {
  const lastFiveRecords = await prisma.record.findMany({
    take: 5,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      Equipment: {
        include: {
          EquipmentType: true,
        },
      },
      CreatedBy: true,
      Borrower: true,
      DeliveredBy: true,
      Attachment: true,
    },
  });

  return lastFiveRecords;
}

export async function fetchRecordById(
  recordId: number,
): Promise<ExtendsRecords | null> {
  const record = await prisma.record.findUnique({
    where: {
      id: recordId,
    },
    include: {
      Equipment: {
        include: {
          EquipmentType: true,
        },
      },
      CreatedBy: true,
      Borrower: true,
      DeliveredBy: true,
      Attachment: true,
    },
  });

  return record;
}

export async function getEquipmentType(): Promise<
  Pick<EquipmentsType, 'name' | 'description'>[]
> {
  return await prisma.equipmentsType.findMany({
    select: {
      name: true,
      description: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
}

export async function countTotalEquipmentsByType() {
  const equipments = await prisma.equipment.findMany({
    include: {
      EquipmentType: true,
    },
  });

  const equipmentMap = new Map<string, (typeof equipments)[0]>();

  equipments.map((equipment) => {
    const uniqueIdentifier = `${equipment.serialNumber}-${equipment.patrimonyNumber}`;
    const existingEquipment = equipmentMap.get(uniqueIdentifier);

    if (
      !existingEquipment ||
      new Date(existingEquipment.createdAt) < new Date(equipment.createdAt)
    ) {
      equipmentMap.set(uniqueIdentifier, equipment);
    }
  });

  const uniqueEquipments = Array.from(equipmentMap.values());

  const filteredNewEquipments = uniqueEquipments.filter(
    (equipment) =>
      !equipment.isAssociated &&
      equipment.equipmentCondition === 'Novo' &&
      equipment.flow === 'checkIn',
  );

  const filteredUsedEquipments = uniqueEquipments.filter(
    (equipment) =>
      !equipment.isAssociated &&
      equipment.equipmentCondition === 'Usado' &&
      equipment.flow === 'checkIn',
  );

  const equipmentCount: {
    new: Record<string, number>;
    used: Record<string, number>;
  } = { new: {}, used: {} };

  const countEquipments = (
    equipments: typeof uniqueEquipments,
    condition: 'new' | 'used',
  ) => {
    equipments.map((equipment) => {
      const type = equipment.EquipmentType.name;
      if (!equipmentCount[condition][type]) {
        equipmentCount[condition][type] = 0;
      }
      equipmentCount[condition][type]++;
    });
  };

  countEquipments(filteredNewEquipments, 'new');
  countEquipments(filteredUsedEquipments, 'used');

  const formatEquipmentCount = (condition: 'new' | 'used') => {
    return Object.entries(equipmentCount[condition]).map(
      ([type, quantity]) => ({
        title: type,
        quantity,
        description: `Total disponível`,
      }),
    );
  };

  return {
    new: formatEquipmentCount('new'),
    used: formatEquipmentCount('used'),
  };
}

export async function verifyUserPermission() {
  const session: Session | null = await auth();
  const isAdmin = session?.user?.role === 'admin';

  if (!isAdmin) {
    // redirect('/warnings');
    return false;
  }

  return true;
}

export async function fetchUsersSelect(): Promise<UserSelect[]> {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      role: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
  return users.map((user) => ({
    ...user,
    label: user.name || '',
  }));
}
