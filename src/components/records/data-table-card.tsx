import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import { DataTable } from './data-table';

type DataTableProps = {
  title: string;
  description?: string;
  tabName: string;
  data: any;
  columns: any;
};

export function DataTableCard({
  title,
  description,
  tabName,
  data,
  columns,
}: DataTableProps) {
  return (
    <TabsContent value={tabName}>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>
          {tabName === 'all' && <DataTable data={data} columns={columns} />}
          {tabName === 'checkins' && (
            <DataTable data={data} columns={columns} />
          )}
          {tabName === 'checkouts' && (
            <DataTable data={data} columns={columns} />
          )}
          {tabName === 'old' && <DataTable data={data} columns={columns} />}
        </CardContent>
        {/* <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>32</strong> products
          </div>
        </CardFooter> */}
      </Card>
    </TabsContent>
  );
}
