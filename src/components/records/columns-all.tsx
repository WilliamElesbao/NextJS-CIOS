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
import Link from 'next/link';

export const columnsAll: ColumnDef<ColumnsDataTableAllRecords>[] = [
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
      console.log(row);
      return (
        <div className="lowercase">
          {formatLongDate(row.original.createdAt)}
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
      console.log(row);

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
            {/* <DropdownMenuItem>Visualizar Registro vinculados</DropdownMenuItem> */}
            <DropdownMenuItem asChild>
              <Link
                href={`/cios/workers/${record.borrowerId}/edit`}
                className="cursor-pointer"
              >
                Visualizar Registro vinculados
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
