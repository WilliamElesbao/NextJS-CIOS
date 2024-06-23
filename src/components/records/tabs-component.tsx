'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, ListFilter, PlusCircle } from 'lucide-react';
import Link from 'next/link';

export function TabsComponent() {
  return (
    <div className="flex items-center">
      <TabsList>
        <TabsTrigger value="all">Tudo</TabsTrigger>
        <TabsTrigger value="checkins">Check-ins</TabsTrigger>
        <TabsTrigger value="checkouts">Check-outs</TabsTrigger>
        <TabsTrigger value="old" className="hidden sm:flex">
          Obsoletos
        </TabsTrigger>
      </TabsList>
      <div className="ml-auto flex items-center gap-2">
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-7 gap-1">
              <ListFilter className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Filtro
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked>Tudo</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Check-ins</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Check-outs</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button size="sm" variant="outline" className="h-7 gap-1">
          <File className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Exportar
          </span>
        </Button> */}
        <Link href={'/cios/records/new'}>
          <Button size="sm" className="h-7 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Novo
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
