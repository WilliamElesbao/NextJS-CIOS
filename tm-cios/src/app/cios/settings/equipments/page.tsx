import { DataTable } from '@/components/settings/equipments/data-table';
import { NewEquipmentForm } from '@/components/settings/equipments/new-equipment-form';
import { fetchEquipments, verifyUserPermission } from '@/lib/data';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Equipamentos',
};

export default async function Page() {
  const equipments = await fetchEquipments();
  const isAdmin = await verifyUserPermission();

  if (!isAdmin) {
    redirect('/warnings');
  }

  return (
    <>
      <div className="">
        <h2>Equipamentos cadastrados</h2>
        <NewEquipmentForm />
        <DataTable data={equipments} />
      </div>
    </>
  );
}
