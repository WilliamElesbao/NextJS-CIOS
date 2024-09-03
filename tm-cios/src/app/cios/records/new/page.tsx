import { NewForm } from '@/components/records/new/new-form';
import { fetchEquipments, fetchReasons, fetchWorkers } from '@/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Novo Registro',
};

export default async function Page() {
  const equipments = await fetchEquipments();
  const reasons = await fetchReasons();
  const workers = await fetchWorkers();

  return (
    <>
      <NewForm equipments={equipments} reasons={reasons} workers={workers} />
    </>
  );
}
