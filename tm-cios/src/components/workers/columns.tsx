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
import { UsersDataTable } from '@/lib/definitions';
import { capitalizeName, getFirstAndLastName } from '@/lib/utils';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { Badge } from '../ui/badge';
import { UserStatus } from '../user-status';

export const columns: ColumnDef<UsersDataTable>[] = [
  {
    accessorFn: (row) => row.registration,
    header: 'Matrícula',
    cell: ({ row }) => {
      return <div className="capitalize w-16">{row.original.registration}</div>;
    },
  },
  {
    accessorFn: (row) => row.name,
    header: 'Comodatário',
    cell: ({ row }) => (
      <div className="capitalize">
        {capitalizeName(getFirstAndLastName(row.original.name))}
      </div>
    ),
  },
  {
    accessorFn: (row) => row.email,
    header: 'Comodatário e-mail',
    cell: ({ row }) => <div className="lowercase">{row.original.email}</div>,
  },
  {
    accessorFn: (row) => row.status,
    header: 'Comodatário Status',
    cell: ({ row }) => {
      return (
        <div className="capitalize w-24">
          <UserStatus condition={row.original.status} />
        </div>
      );
    },
  },
  {
    accessorFn: (row) => row.totalRecords,
    header: 'Total de Registros associados',
    cell: ({ row }) => (
      <Badge className="rounded-full w-7 h-7 flex justify-center">
        {row.original.totalRecords}
      </Badge>
    ),
  },
  {
    id: 'actions',
    header: 'Ações',
    enableHiding: false,
    cell: ({ row }) => {
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
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href={`/cios/workers/${row.original.userId}/edit`}
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
