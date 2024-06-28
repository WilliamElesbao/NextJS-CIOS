'use client';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ColumnsDataTableAllRecords } from '@/lib/definitions';
import { cn, formatLongDate } from '@/lib/utils';
import { Badge } from '../ui/badge';

export const columnsAll: ColumnDef<ColumnsDataTableAllRecords>[] = [
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && 'indeterminate')
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  // {
  //   accessorKey: 'status',
  //   header: 'Status',
  //   cell: ({ row }) => (
  //     <div className="capitalize">{row.getValue('status')}</div>
  //   ),
  // },
  // {
  //   accessorKey: 'email',
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
  //       >
  //         Email
  //         <CaretSortIcon className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
  // },
  // {
  //   accessorKey: 'amount',
  //   header: () => <div className="text-right">Amount</div>,
  //   cell: ({ row }) => {
  //     const amount = parseFloat(row.getValue('amount'));

  //     // Format the amount as a dollar amount
  //     const formatted = new Intl.NumberFormat('en-US', {
  //       style: 'currency',
  //       currency: 'USD',
  //     }).format(amount);

  //     return <div className="text-right font-medium">{formatted}</div>;
  //   },
  // },
  // {
  //   id: 'actions',
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const payment = row.original;

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <DotsHorizontalIcon className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem
  //             onClick={() => navigator.clipboard.writeText(payment.id)}
  //           >
  //             Copy payment ID
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>View customer</DropdownMenuItem>
  //           <DropdownMenuItem>View payment details</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
  {
    accessorKey: 'Número Chamado',
    header: 'Número do Ticket',
    cell: ({ row }) => {
      return <div className="capitalize w-16">{row.original.ticketCode}</div>;
    },
  },
  {
    accessorFn: (row) => row.DeliveredBy.name,
    header: 'Entregue por',
    cell: ({ row }) => {
      return (
        <div className="capitalize w-20">{row.original.DeliveredBy.name}</div>
      );
    },
  },
  {
    accessorFn: (row) => row.Borrower.name,
    header: 'Comodatário Nome',
    cell: ({ row }) => {
      return (
        <div className="capitalize w-20">{row.original.Borrower.name}</div>
      );
    },
  },
  {
    accessorFn: (row) => row.Borrower.email,
    header: 'Comodatário Email',
    cell: ({ row }) => {
      return (
        <div className="lowercase w-auto">{row.original.Borrower.email}</div>
      );
    },
  },
  {
    // accessorKey: 'borrowerStatus',
    accessorFn: (row) => row.Borrower.status,
    header: 'Comodatário Status',
    cell: ({ row }) => {
      return (
        <div className="capitalize w-24">
          <Badge
            className={cn(
              'capitalize hover:cursor-pointer text-foreground opacity-90 w-24 flex justify-center',
              {
                'bg-green-500 hover:opacity-100 hover:bg-green-500':
                  row.original.Borrower.status === 'ativo',
                'bg-red-500 hover:opacity-100 hover:bg-red-500':
                  row.original.Borrower.status === 'demitido',
                'bg-yellow-500 hover:opacity-100 hover:bg-yellow-500':
                  row.original.Borrower.status === 'férias',
              },
            )}
          >
            {row.original.Borrower.status}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: 'Data Registro',
    header: 'Data Registro',
    cell: ({ row }) => {
      return (
        <div className="lowercase">
          {formatLongDate(row.original.deliveryAt)}
        </div>
      );
    },
  },
  {
    accessorKey: 'Turno',
    header: 'Turno',
    cell: ({ row }) => {
      return (
        <div className="capitalize">
          <Badge
            className={cn(
              'capitalize hover:cursor-pointer text-foreground opacity-90 w-24 flex justify-center',
              {
                'bg-blue-400 hover:opacity-100 hover:bg-blue-400':
                  row.original.shift === 'morning',
                'bg-cyan-300 hover:opacity-100 hover:bg-cyan-300':
                  row.original.shift === 'afternoon',
              },
            )}
          >
            {row.original.shift === 'morning' && 'manhã'}
            {row.original.shift === 'afternoon' && 'tarde'}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: 'Criado por (tech)',
    header: 'Criado por (Tech)',
    cell: ({ row }) => {
      return <div className="capitalize">{row.original.CreatedBy.name}</div>;
    },
  },
  {
    id: 'actions',
    header: 'Ações',
    enableHiding: false,
    cell: ({ row }) => {
      const record = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(`RECORD_ID-${record.id}`)
              }
            >
              Copiar ID do Registro
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Visualizar Registro vinculados</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
