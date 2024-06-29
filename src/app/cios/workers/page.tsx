import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { columns } from '@/components/workers/columns';
import { DataTable } from '@/components/workers/data-table';
import { countTotalRecordsByUser } from '@/lib/data';

export default async function Page() {
  const totalRecordsByUser = await countTotalRecordsByUser();
  return (
    <>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Title here</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable data={totalRecordsByUser} columns={columns} />
        </CardContent>
      </Card>
    </>
  );
}
