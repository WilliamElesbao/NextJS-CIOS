import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface UserStatusProps {
  condition: string;
}

export function UserStatus({ condition }: UserStatusProps) {
  return (
    <>
      <Badge
        className={cn(
          'capitalize hover:cursor-pointer opacity-90 w-16 flex justify-center rounded-full border gap-2 items-center',
          {
            'border-[#4ade6b] bg-[#122a2d]/5 text-[#4ade6b] hover:opacity-100 hover:bg-[#122a2d]':
              condition === 'Ativo' || condition === 'ATIVO',
            'border-red-800 bg-red-300 text-red-800 hover:opacity-100 hover:bg-red-500':
              condition !== 'Ativo' && condition !== 'ATIVO',
          },
        )}
      >
        <span
          className={cn('p-1 border rounded-full ', {
            'bg-[#4ade6b]': condition === 'Ativo' || condition === 'ATIVO',
            'bg-red-800': condition !== 'Ativo' && condition !== 'ATIVO',
          })}
        ></span>
        {condition === 'Ativo' || condition === 'ATIVO' ? 'Ativo' : 'Inativo'}
      </Badge>
    </>
  );
}
