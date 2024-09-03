import { DataTable } from '@/components/settings/reasons/data-table';
import { NewReasonForm } from '@/components/settings/reasons/new-reason-form';
import { fetchReasons, verifyUserPermission } from '@/lib/data';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Motivos',
};

export default async function Page() {
  
  const reasons = await fetchReasons();
  const isAdmin = await verifyUserPermission();

  if(!isAdmin) {
    redirect('/warnings');
  }
  
  return (
    <>
      <div className="">
        <h2>Motivos cadastrados</h2>
        <NewReasonForm />
        <DataTable data={reasons} />
      </div>
    </>
  );
}
