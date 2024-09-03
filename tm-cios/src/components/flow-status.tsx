import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface FlowStatusProps {
  condition: string;
}

export function FlowStatus({ condition }: FlowStatusProps) {
  return (
    <>
      <Badge
        className={cn(
          'capitalize hover:cursor-pointer opacity-90 w-18 flex justify-center rounded-full border gap-2 items-center',
          {
            'border-[#4ade6b] bg-[#122a2d]/5 text-[#4ade6b] hover:opacity-100 hover:bg-[#122a2d]':
              condition === 'checkIn',
            'border-red-800 bg-red-300 text-red-800 hover:opacity-100 hover:bg-red-500':
              condition === 'checkOut',
          },
        )}
      >
        <span
          className={cn('p-1 border rounded-full ', {
            'bg-[#4ade6b]': condition === 'checkIn',
            'bg-red-800': condition === 'checkOut',
          })}
        ></span>
        {condition === 'checkIn' ? 'Entrada' : 'Saída'}
      </Badge>
    </>
  );
}
