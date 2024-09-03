'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface SelectItemData {
  id: string;
  label?: string;
}

export interface SelectProps {
  items: SelectItemData[];
  onItemChange: (item: string, status?: string) => void;
  placeholder: string;
  label: string;
  defaultValue?: string;
}

export function SelectDropdown({
  items,
  onItemChange,
  placeholder,
  label,
  defaultValue,
}: SelectProps) {
  return (
    <Select onValueChange={onItemChange} defaultValue={defaultValue}>
      <SelectTrigger className="w-60">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {items.length === 0 ? (
            <SelectItem disabled value="vazio">
              Vazio
            </SelectItem>
          ) : (
            items.map((item) => (
              <SelectItem key={item.id} value={item.id} className="capitalize">
                {item.label ? item.label : item.id}
              </SelectItem>
            ))
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
