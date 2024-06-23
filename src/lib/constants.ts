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
  // { name: 'Técnicos', href: '/cios/technicians', icon: UsersRound },
  // { name: 'Análises', href: '/cios/analytics', icon: LineChart },
];
