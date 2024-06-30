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
  { name: 'Análises', href: '/cios/analytics', icon: LineChart },
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

export const cardsContent = [
  {
    title: 'Notebooks novos',
    quantity: '18',
    description: '*Não formatados',
  },
  {
    title: 'Notebooks novos formatados (ENG)',
    quantity: '5',
    description: '*Disponíveis',
  },
  {
    title: 'Notebooks novos formatados (ADM)',
    quantity: '8',
    description: '*Disponíveis',
  },
  {
    title: 'Total de equipamentos com status Em manutenção',
    quantity: '12',
    description: '+10% em relação à semana passada',
  },
];
