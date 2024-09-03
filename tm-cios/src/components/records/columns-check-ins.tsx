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
import {
  capitalizeName,
  formatLongDate,
  getFirstAndLastName,
} from '@/lib/utils';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { AssociatedStatus } from '../associated-status';
import { EquipmentConditionStatus } from '../equipment-condition-status';
import { FlowStatus } from '../flow-status';

export const columnsCheckIns: ColumnDef<ColumnsDataTableCheckedIn>[] = [
  {
    accessorFn: (row) => row.Record.ticketCode,
    header: 'Número do Ticket',
    cell: ({ row }) => {
      return (
        <div className="w-16 capitalize">
          <Link
            href={`http://sati.tmsa.ind.br/glpi/front/ticket.form.php?id=${row.original.Record.ticketCode}`}
            target={'_blank'}
            className="cursor pointer"
          >
            <Button variant={'link'} className="p-0">
              {row.original.Record.ticketCode}
            </Button>
          </Link>
        </div>
      );
    },
  },
  {
    accessorFn: (row) => row.EquipmentType.name,
    header: 'Equipamento',
    cell: ({ row }) => {
      return (
        <>
          <div className="w-28 font-medium capitalize">
            {row.original.EquipmentType.name}
          </div>
        </>
      );
    },
  },
  {
    accessorFn: (row) => row.description,
    header: 'Descrição do Equipamento',
    cell: ({ row }) => {
      return (
        <div className="hidden text-sm uppercase text-muted-foreground md:inline">
          {row.original.description}
        </div>
      );
    },
  },
  {
    accessorFn: (row) => row.flow,
    header: 'Fluxo',
    cell: ({ row }) => {
      return (
        <div className="w-24 capitalize">
          <FlowStatus condition={row.original.flow} />
        </div>
      );
    },
  },
  {
    accessorFn: (row) => row.equipmentCondition,
    header: 'Condição do Equipamento',
    cell: ({ row }) => {
      return (
        <div className="w-24 capitalize">
          <EquipmentConditionStatus
            condition={row.original.equipmentCondition}
          />
        </div>
      );
    },
  },
  {
    accessorFn: (row) => row.Record.createdAt,
    header: 'Data Registro',
    cell: ({ row }) => {
      return (
        <div className="lowercase">
          {formatLongDate(row.original.Record.createdAt)}
        </div>
      );
    },
  },
  {
    accessorFn: (row) => row.isAssociated,
    header: 'Status',
    cell: ({ row }) => {
      return (
        <div className="w-24 capitalize">
          <AssociatedStatus condition={row.original.isAssociated} />
        </div>
      );
    },
  },
  {
    accessorFn: (row) => row.Record.Borrower.name,
    header: 'Comodatário',
    cell: ({ row }) => {
      return (
        <>
          <div className="font-medium">
            {capitalizeName(
              getFirstAndLastName(row.original.Record.Borrower.name),
            )}
          </div>
          <div className='className="hidden md:inline" text-sm text-muted-foreground'>
            {row.original.Record.Borrower.email}
          </div>
        </>
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
