import { DataTableCard } from '@/components/records/data-table-card';
import { TabsComponent } from '@/components/records/tabs-component';
import { Tabs } from '@/components/ui/tabs';

export default function Page() {
  return (
    <>
      <Tabs defaultValue="all">
        <TabsComponent />
        <DataTableCard value="all" title="Todos os registros" />
        <DataTableCard value="checkins" title="Todos check-ins" />
        <DataTableCard value="checkouts" title="Todos check-outs" />
        <DataTableCard value="old" title="Obsoletos" />
      </Tabs>
    </>
  );
}
