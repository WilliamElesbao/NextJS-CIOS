import { NewForm } from '@/components/records/new/new-form';
import { fetchEquipments, fetchWorkers } from '@/lib/data';

export default async function Page() {
  const equipments = await fetchEquipments();
  const workers = await fetchWorkers();
  return (
    <>
      <NewForm equipaments={equipments} workers={workers} />
    </>
  );
}
