import { clsx, type ClassValue } from 'clsx';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatLongDate(date: Date) {
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ptBR });
}

export function getUrl(path?: string): string {
  const baseUrl = process.env.APP_URL || '';
  const normalizedPath =
    path && !path.startsWith('/') ? `/${path}` : path || '';
  return `${baseUrl}${normalizedPath}`;
}

export function getFirstAndLastName(fullName: string): string {
  const names = fullName.trim().split(' ');
  if (names.length <= 1) {
    return fullName;
  }
  return `${names[0]} ${names[names.length - 1]}`;
}

export function capitalizeName(name: string): string {
  return name
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function formatDateToBr(date: Date | undefined): string | undefined {
  return date?.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
