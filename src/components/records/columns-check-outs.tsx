'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ColumnsDataTableCheckedIn } from '@/lib/definitions';
import { cn } from '@/lib/utils';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { Badge } from '../ui/badge';

export const columnsCheckOuts: ColumnDef<ColumnsDataTableCheckedIn>[] = [
  {
    accessorFn: (row) => row.Record.ticketCode,
    header: 'Número do Ticket',
    cell: ({ row }) => {
      return (
        <div className="capitalize w-16">{row.original.Record.ticketCode}</div>
      );
    },
  },
  {
    accessorFn: (row) => row.EquipmentType.name,
    header: 'Equipamento',
    cell: ({ row }) => {
      return (
        <div className="capitalize w-16">{row.original.EquipmentType.name}</div>
      );
    },
  },
  {
    accessorFn: (row) => row.description,
    header: 'Descrição do Equipamento',
    cell: ({ row }) => {
      return <div className="capitalize w-16">{row.original.description}</div>;
    },
  },
  {
    accessorFn: (row) => row.flow,
    header: 'Fluxo',
    cell: ({ row }) => {
      return (
        <div className="capitalize w-24">
          <Badge
            className={cn(
              'capitalize hover:cursor-pointer text-foreground opacity-90 w-24 flex justify-center',
              {
                'bg-red-500 hover:opacity-100 hover:bg-red-500':
                  row.original.flow === 'checkOut',
              },
            )}
          >
            Check-out
          </Badge>
        </div>
      );
    },
  },
  {
    accessorFn: (row) => row.equipmentCondition,
    header: 'Condição do Equipamento',
    cell: ({ row }) => {
      return (
        <div className="capitalize w-24">
          <Badge
            className={cn(
              'capitalize hover:cursor-pointer text-foreground opacity-90 w-24 flex justify-center',
              {
                'bg-green-500 hover:opacity-100 hover:bg-green-500':
                  row.original.equipmentCondition === 'Novo',
                'bg-red-500 hover:opacity-100 hover:bg-red-500':
                  row.original.equipmentCondition === 'Descarte',
                'bg-yellow-500 hover:opacity-100 hover:bg-yellow-500':
                  row.original.equipmentCondition === 'Usado',
              },
            )}
          >
            {row.original.equipmentCondition}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorFn: (row) => row.isAssociated,
    header: 'Status',
    cell: ({ row }) => {
      return (
        <div className="capitalize w-24">
          <Badge
            className={cn(
              'capitalize hover:cursor-pointer text-foreground opacity-90 w-24 flex justify-center text-center',
              {
                'bg-green-500 hover:opacity-100 hover:bg-green-500':
                  row.original.isAssociated === true,
                'bg-red-500 hover:opacity-100 hover:bg-red-500':
                  row.original.isAssociated === false,
              },
            )}
          >
            {row.original.isAssociated ? 'Associado' : 'Não associado'}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorFn: (row) => row.Record.Borrower.name,
    header: 'Comodatário',
    cell: ({ row }) => {
      return (
        <div className="capitalize w-16">
          {row.original.Record.Borrower.name}
        </div>
      );
    },
  },
  {
    accessorFn: (row) => row.Record.Borrower.email,
    header: 'Comodatário e-mail',
    cell: ({ row }) => {
      return (
        <div className="lowercase w-16">
          {row.original.Record.Borrower.email}
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: 'Ações',
    enableHiding: false,
    cell: ({ row }) => {
      const record = row.original.Record;

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
            <DropdownMenuItem asChild>
              <Link
                href={`/cios/workers/${record.Borrower.id}/edit`}
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
