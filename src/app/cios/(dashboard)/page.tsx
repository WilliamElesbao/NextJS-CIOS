import { cardsContent } from '@/lib/constants';
import { fetchLastFiveRecords, fetchLastRecord } from '@/lib/data';
import { Cards } from '../../../components/dashboard/cards';
import { DataTable } from '../../../components/dashboard/data-table';
import { DetailsCard } from '../../../components/dashboard/details-card';

export default async function Page() {
  const lastRecord = await fetchLastRecord();
  const lastFiveRecords = await fetchLastFiveRecords();

  return (
    <>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Cards cardsContent={cardsContent} />
          </div>
          <DataTable lastFiveRecords={lastFiveRecords} />
        </div>

        <DetailsCard lastRecord={lastRecord} />
      </main>
    </>
  );
}
