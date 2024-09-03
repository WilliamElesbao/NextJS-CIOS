import { Cards } from '@/components/workers/edit/cards';
import {
  fetchByBorrowerIdAllRecords,
  fetchWorkers,
  verifyUserPermission,
} from '@/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Registros',
};

export default async function Page({ params }: { params: { userId: string } }) {
  const userId = params.userId;
  const recordsByUser = await fetchByBorrowerIdAllRecords(userId);
  const workers = await fetchWorkers();
  const hasPermission = await verifyUserPermission();

  return (
    <main>
      <Cards data={recordsByUser} workers={workers} isAdmin={hasPermission} />
    </main>
  );
}
