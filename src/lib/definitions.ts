import {
  Attachment,
  Equipment,
  EquipmentsType,
  ReasonsType,
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

export interface ColumnsDataTableAllRecords {
  id: string;
  ticketCode: string;
  DeliveredBy: Pick<Worker, 'name' | 'email' | 'cc' | 'manager'>;
  deliveryAt: Date;
  shift: string;
  Borrower: Pick<Worker, 'name' | 'email' | 'cc' | 'manager' | 'status'>;
  date: string;
  CreatedBy: Pick<User, 'name' | 'email'>;
}

export interface ColumnsDataTableCheckedIn {
  EquipmentType: Pick<EquipmentsType, 'name' | 'description'>;
  flow: string;
  equipmentCondition: string;
  Record: {
    id: number;
    ticketCode: string;
    Borrower: Pick<Worker, 'name' | 'email' | 'cc' | 'manager' | 'status'>;
    Attachments: Attachment[];
  };
}

export interface ColumnsDataTableOld {
  id: number;
  recordId: number;
  EquipmentType: Pick<EquipmentsType, 'name' | 'description'>;
  description: string;
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
    Borrower: Pick<Worker, 'name' | 'email' | 'cc' | 'manager' | 'status'>;
    Attachments: Attachment[];
  };
}
