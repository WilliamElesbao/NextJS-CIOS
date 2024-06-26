export interface FilePreview {
  name: string;
  url: string;
  type: string;
}

export interface EquipamentItem {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Workers {
  id: number;
  name: string;
  email: string;
  cc: string;
  manager: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Equipament {
  equipaments: EquipamentItem[];
  workers: Workers[];
}
