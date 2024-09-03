import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { columns } from '@/components/workers/columns';
import { DataTable } from '@/components/workers/data-table';
import { countTotalRecordsByUser } from '@/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Usuários',
};

export default async function Page() {
  const totalRecordsByUser = await countTotalRecordsByUser();
  return (
    <>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Registros por usuário</CardTitle>
          <CardDescription>
            Exibe os registros vinculado aos usuários e os equipamentos de cada
            registro
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable data={totalRecordsByUser} columns={columns} />
        </CardContent>
      </Card>
    </>
  );
}
