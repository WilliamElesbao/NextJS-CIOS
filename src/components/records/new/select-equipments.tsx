import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { EquipamentItem } from '@/lib/definitions';

export function SelectEquipments({ equipments, title }: any) {
  return (
    <Select>
      <SelectTrigger className="w-full bg-background">
        <SelectValue placeholder={`${title}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{title}</SelectLabel>
          {equipments.map((equipment: EquipamentItem) => (
            <SelectItem key={equipment.id} value={equipment.name}>
              {equipment.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
