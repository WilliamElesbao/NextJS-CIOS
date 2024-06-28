// 'use client';

// import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
// import * as React from 'react';

// import { Button } from '@/components/ui/button';
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from '@/components/ui/command';
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from '@/components/ui/popover';
// import { cn } from '@/lib/utils';

// const equipaments = [
//   {
//     value: 'monitor',
//     label: 'Monitor',
//   },
//   {
//     value: 'mouse',
//     label: 'Mouse',
//   },
//   {
//     value: 'teclado',
//     label: 'Teclado',
//   },
//   {
//     value: 'headset',
//     label: 'Headset',
//   },
//   {
//     value: 'notebook',
//     label: 'Notebook',
//   },
//   {
//     value: 'allinone',
//     label: 'All In One',
//   },
//   {
//     value: 'workstation',
//     label: 'Workstation',
//   },
// ];

// export function SelectType() {
//   const [open, setOpen] = React.useState(false);
//   const [value, setValue] = React.useState('');

//   return (
//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverTrigger asChild>
//         <Button
//           variant="outline"
//           role="combobox"
//           aria-expanded={open}
//           className="w-full justify-between"
//         >
//           {value
//             ? equipaments.find((equipament) => equipament.value === value)?.label
//             : 'Tipo de equip...'}
//           <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-[200px] p-0">
//         <Command>
//           <CommandInput placeholder="Exemplo: monitor..." className="h-9" />
//           <CommandList>
//             <CommandEmpty>Equipamento não encontrado</CommandEmpty>
//             <CommandGroup>
//               {equipaments.map((equipament) => (
//                 <CommandItem
//                   key={equipament.value}
//                   value={equipament.value}
//                   onSelect={(currentValue) => {
//                     setValue(currentValue === value ? '' : currentValue);
//                     setOpen(false);
//                   }}
//                 >
//                   {equipament.label}
//                   <CheckIcon
//                     className={cn(
//                       'ml-auto h-4 w-4',
//                       value === equipament.value ? 'opacity-100' : 'opacity-0',
//                     )}
//                   />
//                 </CommandItem>
//               ))}
//             </CommandGroup>
//           </CommandList>
//         </Command>
//       </PopoverContent>
//     </Popover>
//   );
// }
