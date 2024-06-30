import DashboardCards from '@/components/analytics/cards';
import { findAllRecords } from '@/lib/data';

export default async function Page() {
  const records = await findAllRecords();
  return (
    <>
      <div className="container mx-auto p-4">
        <DashboardCards records={records} />
      </div>
    </>
  );
}
