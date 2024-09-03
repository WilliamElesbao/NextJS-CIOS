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
import { ColumnsDataTableAllRecords } from '@/lib/definitions';
import {
  capitalizeName,
  formatLongDate,
  getFirstAndLastName,
} from '@/lib/utils';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { ShiftStatus } from '../shift-status';
import { UserStatus } from '../user-status';

export const columnsAll: ColumnDef<ColumnsDataTableAllRecords>[] = [
  {
    accessorKey: 'id',
    header: 'Nº Registro',
    cell: ({ row }) => {
      return (
        <div className="capitalize w-16 text-center">{row.original.id}</div>
      );
    },
  },
  {
    accessorKey: 'ticketCode',
    header: 'Número do Ticket',
    cell: ({ row }) => {
      return (
        <div className="capitalize w-16">
          <Link
            href={`http://sati.tmsa.ind.br/glpi/front/ticket.form.php?id=${row.original.ticketCode}`}
            target={'_blank'}
            className="cursor pointer"
          >
            <Button variant={'link'} className="p-0">
              {row.original.ticketCode}
            </Button>
          </Link>
        </div>
      );
    },
  },
  {
    accessorFn: (row) => row.DeliveredBy.name,
    header: 'Entregue por',
    cell: ({ row }) => {
      return (
        <>
          <div className="font-medium">
            {capitalizeName(getFirstAndLastName(row.original.DeliveredBy.name))}
          </div>
          <div className="hidden text-sm text-muted-foreground md:inline">
            {row.original.DeliveredBy.email}
          </div>
        </>
      );
    },
  },
  {
    accessorFn: (row) => row.Borrower.name,
    header: 'Comodatário',
    cell: ({ row }) => {
      return (
        <>
          <div className="font-medium">
            {capitalizeName(getFirstAndLastName(row.original.Borrower.name))}
          </div>
          <div className="hidden text-sm text-muted-foreground md:inline">
            {row.original.Borrower.email}
          </div>
        </>
      );
    },
  },
  {
    accessorFn: (row) => row.Borrower.status,
    header: 'Comodatário Status',
    cell: ({ row }) => {
      return (
        <div className="capitalize w-24">
          <UserStatus condition={row.original.Borrower.status} />
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
          <ShiftStatus condition={row.original.shift!} />
        </div>
      );
    },
  },
  {
    accessorKey: 'Criado por (tech)',
    header: 'Criado por (Tech)',
    cell: ({ row }) => {
      return (
        <>
          <div className="font-medium">
            {capitalizeName(getFirstAndLastName(row.original.CreatedBy.name!))}
          </div>
          <div className="hidden text-sm text-muted-foreground md:inline">
            {row.original.CreatedBy.email}
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
