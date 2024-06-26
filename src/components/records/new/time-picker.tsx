import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function TimePicker() {
  return (
    <Select>
      <SelectTrigger className="w-auto">
        <SelectValue placeholder="Selecione o turno" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Turno</SelectLabel>
          <SelectItem value="morning">Manhã</SelectItem>
          <SelectItem value="afternoon">Tarde</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
