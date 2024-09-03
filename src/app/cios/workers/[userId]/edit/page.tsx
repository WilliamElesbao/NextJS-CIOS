import { Cards } from '@/components/workers/edit/cards';
import { fetchByBorrowerIdAllRecords, fetchWorkers } from '@/lib/data';

export default async function Page({ params }: { params: { userId: string } }) {
  const userId = params.userId;
  const recordsByUser = await fetchByBorrowerIdAllRecords(Number(userId));
  const workers = await fetchWorkers();

  return (
    <main>
      <Cards data={recordsByUser} workers={workers} />
    </main>
  );
}
