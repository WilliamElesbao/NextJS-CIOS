import {
  ClipboardList,
  LayoutDashboard,
  LineChart,
  Settings,
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
  { name: 'Usuários', href: '/cios/workers', icon: UsersRound },
  // { name: 'Análises', href: '/cios/analytics', icon: LineChart },
  { name: 'Settings', href: '/cios/settings', icon: Settings },
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
  { name: 'Motivo', value: 'reasonsType' },
  { name: 'Observações', value: 'notes' },
  { name: 'Ações', value: 'actions' },
];

export const settingsMenu = [
  {
    name: 'Motivos',
    value: 'reasons',
    href: '/cios/settings/reasons',
    icon: '',
  },
  {
    name: 'Equipamentos',
    value: 'equipments',
    href: '/cios/settings/equipments',
    icon: '',
  },
];

export const conditionType = [
  { name: 'Novo', value: 'new' },
  { name: 'Usado', value: 'old' },
  { name: 'Descarte', value: 'obsolete' },
];

export const statusType = [
  { name: 'Check-in', value: 'checkIn' },
  { name: 'Check-out', value: 'checkOut' },
];

export const configDataTableColumnsEmail = [
  { name: 'Tipo', value: 'type', width: '100px' },
  { name: 'Descrição/Hostname', value: 'description', width: '200px' },
  { name: 'Patrimônio', value: 'patrimony', width: '100px' },
  { name: 'Serial Number', value: 'serialNumber', width: '120px' },
  { name: 'Condição', value: 'condition', width: '100px' },
  { name: 'Motivo', value: 'reason', width: '100px' },
  { name: 'Observação', value: 'observation', width: '150px' },
];
