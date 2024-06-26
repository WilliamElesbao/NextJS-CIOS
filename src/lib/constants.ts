import {
  ClipboardList,
  LayoutDashboard,
  LineChart,
  UsersRound,
} from 'lucide-react';

export interface LinkItem {
  name: string;
  href: string;
  icon?: React.ElementType;
}

export const links: LinkItem[] = [
  { name: 'Dashboard', href: '/cios', icon: LayoutDashboard },
  { name: 'Registros', href: '/cios/records', icon: ClipboardList },
  { name: 'Técnicos', href: '/cios/technicians', icon: UsersRound },
  { name: 'Análises', href: '/cios/analytics', icon: LineChart },
];

export const shifts = [
  { name: 'Manhã', value: 'morning' },
  { name: 'Tarde', value: 'afternoon' },
];

export const columnNames = [
  { name: 'Tipo', value: 'type' },
  { name: 'Descrição/Identificação', value: 'description' },
  { name: 'Serial', value: 'serial' },
  { name: 'Patrimônio', value: 'patrimony' },
  { name: 'Condição do equipamento', value: 'condition' },
  { name: 'Status', value: 'statusType' },
  { name: 'Observações', value: 'notes' },
  { name: 'Ações', value: 'actions' },
];

export const entryType = [
  { name: 'Manutenção', value: 'maintenance' },
  { name: 'Manutenção terceirizada', value: 'outMaintenance' },
  { name: 'Troca', value: 'change' },
  { name: 'Demissão', value: 'dismissal' },
];

export const conditionType = [
  { name: 'Novo', value: 'new' },
  { name: 'Usado', value: 'old' },
];
export const statusType = [
  { name: 'Entrada', value: 'checkIn' },
  { name: 'Saída', value: 'checkOut' },
];
