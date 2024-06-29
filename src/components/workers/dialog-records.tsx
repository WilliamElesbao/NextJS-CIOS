// import { Button } from '@/components/ui/button';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { fetchByBorrowerIdAllRecords } from '@/lib/data';
// import { useEffect, useState } from 'react';

// export function DialogRecord({ userId }: { userId: number }) {
//   console.log(userId);

//   const [records, setRecords] = useState<any[]>([]);
//   const fetchAndSetRecords = async () => {
//     try {
//       const fetchedRecords = await fetchByBorrowerIdAllRecords(userId);
//       setRecords(fetchedRecords);
//     } catch (error) {
//       console.error('Error fetching records:', error);
//       // Handle error or set appropriate state if needed
//     }
//   };
//   useEffect(() => {
//     fetchAndSetRecords();
//   }, [userId]);

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="outline">Visualizar Registros vinculados</Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[95%] sm:min-h-[80%]">
//         <DialogHeader>
//           <DialogTitle>Registros</DialogTitle>
//           <DialogDescription>
//             Todos os registros associados ao usuário {}
//           </DialogDescription>
//         </DialogHeader>
//         <div className="grid gap-4 py-4">
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="name" className="text-right">
//               Name
//             </Label>
//             <Input id="name" value="Pedro Duarte" className="col-span-3" />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="username" className="text-right">
//               Username
//             </Label>
//             <Input id="username" value="@peduarte" className="col-span-3" />
//           </div>
//         </div>
//         <DialogFooter>
//           <Button type="submit">Save changes</Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }
