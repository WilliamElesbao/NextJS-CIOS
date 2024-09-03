import { CardTitle } from '@/components/ui/card';
import {
  countTotalEquipmentsByType,
  fetchLastFiveRecords,
  fetchLastRecord,
  getEquipmentType,
} from '@/lib/data';
import { Metadata } from 'next';
import { Cards } from '../../../components/dashboard/cards';
import { DataTable } from '../../../components/dashboard/data-table';
import { DetailsCard } from '../../../components/dashboard/details-card';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function Page() {
  const lastRecord = await fetchLastRecord();
  const lastFiveRecords = await fetchLastFiveRecords();
  const equipmentType = await getEquipmentType();
  const countEquipmentsByType = await countTotalEquipmentsByType();

  return (
    <>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <CardTitle className="text-sm font-medium">Novos</CardTitle>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-2 xl:grid-cols-5">
            <Cards
              equipmentType={equipmentType}
              cardsContent={countEquipmentsByType.new}
              condition="new"
            />
          </div>
          <CardTitle className="text-sm font-medium">Usados</CardTitle>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-2 xl:grid-cols-5">
            <Cards
              equipmentType={equipmentType}
              cardsContent={countEquipmentsByType.used}
              condition="used"
            />
          </div>
          <DataTable lastFiveRecords={lastFiveRecords} />
        </div>
        <DetailsCard lastRecord={lastRecord} />
      </main>
    </>
  );
}
