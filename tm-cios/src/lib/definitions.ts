import {
  Attachment,
  Equipment,
  EquipmentsType,
  ReasonsType,
  Record,
  User,
  Worker,
} from '@prisma/client';

export interface FilePreview {
  name: string;
  url: string;
  type: string;
}

export interface NewFormProps {
  equipments: EquipmentsType[];
  reasons: ReasonsType[];
  workers: Worker[];
}

interface EquipmentFields {
  equipmentType: string;
  description: string;
  serialNumber: string;
  patrimonyId: string;
  condition: string;
  status: string;
  reason?: string;
  relatedNote?: string;
}

interface RecordType {
  deliveredBy: string;
  borrower: string;
  costCenter: string;
  supervisors?: string | null;
  manager: string;
  date: Date;
  shifts: string;
  ticketNumber: string;
  notes?: string;
  equipmentsArray: EquipmentFields[];
}

export interface RecordForm {
  record: RecordType;
  attachments: FormData;
}

export interface SelectEquipmentsProps {
  equipments: EquipmentsType[];
  title: string;
}

export interface UsersDataTable {
  userId: string;
  registration: string;
  totalRecords: number;
  name: string;
  email: string;
  status: string;
}

export interface RecordsByUser {
  id: number;
  deliveredByWorkerId: string;
  deliveryAt: Date | null;
  deliveryTime: Date | null;
  borrowerId: string;
  costCenter: string | null;
  responsibleManager: string | null;
  ticketCode: string;
  generalObservations: string | null;
  shift: string;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
  Equipment: Array<{
    id: number;
    recordId: number;
    equipmentType: string;
    EquipmentType: Equipment;
    description: string;
    serialNumber: string;
    patrimonyNumber: string;
    equipmentCondition: string;
    status: string | null;
    flow: string;
    entryType: string | null;
    observations: string | null;
    createdAt: Date;
    updatedAt: Date;
  }>;
  Attachment: Array<{
    id: number;
    filename: string;
    recordId: number;
    createdAt: Date;
    updatedAt: Date;
  }>;
  CreatedBy: {
    id: string;
    name: string;
    email: string;
    emailVerified: string | null;
    image: string | null;
    role: string;
    createdAt: Date;
    updatedAt: Date;
  };
  Borrower: {
    id: string;
    name: string;
    email: string;
    cc: string;
    manager: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  };
  DeliveredBy: {
    id: string;
    name: string;
    email: string;
    cc: string;
    manager: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

// ok
export interface ColumnsDataTableAllRecords extends Record {
  DeliveredBy: Pick<Worker, 'name' | 'email' | 'cc' | 'manager'>;
  Borrower: Pick<Worker, 'name' | 'email' | 'cc' | 'manager' | 'status'>;
  CreatedBy: Pick<User, 'name' | 'email'>;
}

export interface ColumnsDataTableCheckedIn {
  description: string;
  isAssociated: boolean;
  EquipmentType: Pick<EquipmentsType, 'name' | 'description'>;
  flow: string;
  equipmentCondition: string;
  Record: {
    id: number;
    ticketCode: string;
    Borrower: Pick<
      Worker,
      'id' | 'name' | 'email' | 'cc' | 'manager' | 'status'
    >;
    Attachments: Attachment[];
    createdAt: Date;
  };
}

export interface ColumnsDataTableOld {
  id: number;
  recordId: number;
  EquipmentType: Pick<EquipmentsType, 'name' | 'description'>;
  description: string;
  isAssociated: boolean;
  serialNumber: string;
  patrimonyNumber: string;
  equipmentCondition: string;
  status: string | null;
  flow: string;
  entryType: string;
  observations: string;
  createdAt: Date;
  updatedAt: Date;
  Record: {
    id: number;
    ticketCode: string;
    Borrower: Pick<
      Worker,
      'id' | 'name' | 'email' | 'cc' | 'manager' | 'status'
    >;
    createdAt: Date;
    Attachments: Attachment[];
  };
}

export interface ExtendsEquipment extends Equipment {
  EquipmentType: EquipmentsType;
}

export interface ExtendsRecords extends Record {
  Equipment: ExtendsEquipment[];
  CreatedBy: User;
  Borrower: Worker;
  DeliveredBy: Worker;
  UpdatedBy?: User | null;
  Attachment: Attachment[];
}

export type UserSelect = {
  id: string;
  label: string;
  role: string | null;
};
