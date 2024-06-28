// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { SelectEquipmentsProps } from '@/lib/definitions';
// import { EquipmentsType } from '@prisma/client';

// export function SelectEquipments({ equipments, title }: SelectEquipmentsProps) {
//   return (
//     <Select>
//       <SelectTrigger className="w-full bg-background">
//         <SelectValue placeholder={`${title}`} />
//       </SelectTrigger>
//       <SelectContent>
//         <SelectGroup>
//           <SelectLabel>{title}</SelectLabel>
//           {equipments.map((equipment: Pick<EquipmentsType, 'id' | 'name'>) => (
//             <SelectItem key={equipment.id} value={equipment.name}>
//               {equipment.name}
//             </SelectItem>
//           ))}
//         </SelectGroup>
//       </SelectContent>
//     </Select>
//   );
// }
