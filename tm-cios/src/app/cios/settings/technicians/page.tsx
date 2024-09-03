import PermissionsCard from '@/components/settings/technicians/permissions-card';
import { fetchUsersSelect, verifyUserPermission } from '@/lib/data';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Técnicos',
};

export default async function Page() {
  const users = await fetchUsersSelect();
  const isAdmin = await verifyUserPermission();

  if (!isAdmin) {
    redirect('/warnings');
  }

  return (
    isAdmin && (
      <>
        <div className="space-y-6">
          <PermissionsCard users={users} />
        </div>
      </>
    )
  );
}
