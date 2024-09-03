import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';
import { updateEquipmentAssociationStatus } from '@/lib/actions';
import { useState } from 'react';

export function AssociatedSwitcher({
  isAssociated,
  equipmentId,
  serialNumber,
  patrimonyId,
  userId,
}: {
  isAssociated: boolean;
  equipmentId: number;
  serialNumber: string;
  patrimonyId: string;
  userId: number;
}) {
  const [associated, setAssociated] = useState(isAssociated);

  const handleAssociatedChange = async () => {
    try {
      const result = await updateEquipmentAssociationStatus(
        equipmentId,
        !associated,

        serialNumber,
        patrimonyId,
        userId,
      );
      if (result.status) {
        setAssociated(!associated);
        toast({
          title: 'Status atualizado',
          description: result.message,
        });
      } else {
        toast({
          title: 'Erro ao atualizar o status',
          description: result.message,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="associatedABorrower"
        checked={associated}
        onCheckedChange={handleAssociatedChange}
      />
      <Label htmlFor="associatedABorrower" className="capitalize">
        {associated ? 'associado' : 'não associado'}
      </Label>
    </div>
  );
}
