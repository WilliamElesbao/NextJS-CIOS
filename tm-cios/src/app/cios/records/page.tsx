import { columnsAll } from '@/components/records/columns-all';
import { columnsCheckIns } from '@/components/records/columns-check-ins';
import { columnsOld } from '@/components/records/columns-check-old';
import { columnsCheckOuts } from '@/components/records/columns-check-outs';
import { DataTableCard } from '@/components/records/data-table-card';
import { TabsComponent } from '@/components/records/tabs-component';
import { Tabs } from '@/components/ui/tabs';
import {
  fetchAllCheckedInEquipments,
  fetchAllCheckedOutEquipments,
  fetchAllObsoleteEquipments,
  fetchAllRecords,
} from '@/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Registros',
};

export default async function Page() {
  const allRecords = await fetchAllRecords();

  const allEquipmentsHasBeenCheckedIn = await fetchAllCheckedInEquipments();

  const allEquipmentsHasBeenCheckedOut = await fetchAllCheckedOutEquipments();

  const allObsoleteEquipments = await fetchAllObsoleteEquipments();
  return (
    <>
      <Tabs defaultValue="all">
        <TabsComponent />
        <DataTableCard
          tabName="all"
          title="Todos os registros"
          description="Todos os registros"
          data={allRecords}
          columns={columnsAll}
        />
        <DataTableCard
          tabName="checkins"
          title="Todos check-ins"
          description="Todos equipamentos com status de check-in"
          data={allEquipmentsHasBeenCheckedIn}
          columns={columnsCheckIns}
        />
        <DataTableCard
          tabName="checkouts"
          title="Todos check-outs"
          description="Todos equipamentos com status de check-in"
          data={allEquipmentsHasBeenCheckedOut}
          columns={columnsCheckOuts}
        />
        <DataTableCard
          tabName="old"
          title="Equipamentos obsoletos"
          description="Todos equipamentos marcados como obsoletos"
          data={allObsoleteEquipments}
          columns={columnsOld}
        />
      </Tabs>
    </>
  );
}
