import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface EquipmentConditionStatusProps {
  condition: string;
}

export function EquipmentConditionStatus({
  condition,
}: EquipmentConditionStatusProps) {
  return (
    <>
      <Badge
        className={cn(
          'capitalize hover:cursor-pointer opacity-90 w-18 flex justify-center rounded-full border gap-2 items-center',
          {
            'border-[#4ade6b] bg-[#122a2d]/5 text-[#4ade6b] hover:opacity-100 hover:bg-[#122a2d]':
              condition === 'Novo',
            'border-red-800 bg-red-300 text-red-800 hover:opacity-100 hover:bg-red-500':
              condition === 'Descarte',
            'border-[#854d0e] bg-[#fefce8]/80 text-[#854d0e] hover:opacity-100 hover:bg-[#fefce8]':
              condition === 'Usado',
          },
        )}
      >
        <span
          className={cn('p-1 border rounded-full ', {
            'bg-[#4ade6b]': condition === 'Novo',
            'bg-[#854d0e]': condition === 'Usado',
            'bg-red-500': condition === 'Descarte',
          })}
        ></span>
        {condition === 'Novo' && 'Novo'}
        {condition === 'Usado' && 'Usado'}
        {condition === 'Descarte' && 'Descarte'}
      </Badge>
    </>
  );
}
