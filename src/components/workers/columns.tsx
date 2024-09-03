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
import { UsersDataTable } from '@/lib/definitions';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Badge } from '../ui/badge';

export const columns: ColumnDef<UsersDataTable>[] = [
  {
    accessorFn: (row) => row.userId,
    header: 'Matrícula',
    cell: ({ row }) => {
      return <div className="capitalize w-16">{row.original.userId}</div>;
    },
  },
  {
    accessorFn: (row) => row.name,
    header: 'Comodatário',
    cell: ({ row }) => <div className="capitalize">{row.original.name}</div>,
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
          <Badge
            className={cn(
              'capitalize hover:cursor-pointer text-foreground opacity-90 w-24 flex justify-center',
              {
                'bg-green-500 hover:opacity-100 hover:bg-green-500':
                  row.original.status === 'ativo',
                'bg-red-500 hover:opacity-100 hover:bg-red-500':
                  row.original.status === 'demitido',
                'bg-yellow-500 hover:opacity-100 hover:bg-yellow-500':
                  row.original.status === 'férias',
              },
            )}
          >
            {row.original.status}
          </Badge>
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
