import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ShiftStatusProps {
  condition: string;
}

export function ShiftStatus({ condition }: ShiftStatusProps) {
  return (
    <>
      <Badge
        className={cn(
          'capitalize hover:cursor-pointer opacity-90 w-16 flex justify-center rounded-full border gap-1 items-center',
          {
            'border-[#1d73e3] bg-[#68acf0]/5 text-[#1d73e3] hover:opacity-100 hover:bg-[#68acf0]':
              condition === 'morning',
            'border-[#854d0e] bg-[#fefce8]/80 text-[#854d0e] hover:opacity-100 hover:bg-[#fefce8]':
              condition === 'afternoon',
          },
        )}
      >
        <span
          className={cn('p-1 border rounded-full ', {
            'bg-[#1d73e3]': condition === 'morning',
            'bg-[#854d0e]': condition === 'afternoon',
          })}
        ></span>
        {condition === 'morning' ? 'Manhã' : 'Tarde'}
      </Badge>
    </>
  );
}
