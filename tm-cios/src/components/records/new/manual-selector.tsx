import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import clsx from 'clsx';
import { Hand, MousePointer } from 'lucide-react';
import { useState } from 'react';

interface ManualSelectorProps {
  onChange: (boolean: boolean) => void;
  onReset: () => void;
}

export function ManualSelector({ onChange, onReset }: ManualSelectorProps) {
  const [isEnable, setIsEnable] = useState<boolean>(false);

  const handleChanges = () => {
    setIsEnable(!isEnable);
    onChange(!isEnable);
    onReset();
  };

  return (
    <>
      <Label
        className={clsx(
          'bg-background text-muted-foreground p-1 border rounded-full cursor-pointer',
          {
            'bg-foreground': isEnable,
          },
        )}
      >
        <Input
          type="checkbox"
          checked={isEnable}
          onChange={handleChanges}
          className="sr-only"
        />
        {!isEnable ? (
          <div className="flex flex-nowrap items-center gap-1">
            <MousePointer className="w-4 h-4" />
            <span className="hidden md:block sr-only">Usar seletor</span>
          </div>
        ) : (
          <div className="flex flex-nowrap items-center gap-1">
            <Hand className="w-4 h-4" />
            <span className="hidden md:block sr-only">Inserir manualmente</span>
          </div>
        )}
      </Label>
    </>
  );
}
