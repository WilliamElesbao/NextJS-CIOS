'use client';

import { Button } from '@/components/ui/button';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

export function TabsComponent() {
  return (
    <div className="flex items-center">
      <TabsList>
        <TabsTrigger value="all">Todos registros</TabsTrigger>
        <TabsTrigger value="checkins">Entrada</TabsTrigger>
        <TabsTrigger value="checkouts">Saída</TabsTrigger>
        <TabsTrigger value="old" className="hidden sm:flex">
          Descarte
        </TabsTrigger>
      </TabsList>
      <div className="ml-auto flex items-center gap-2">
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
