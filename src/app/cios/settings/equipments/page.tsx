import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { fetchEquipments } from '@/lib/data';
import { DataTable } from '@/components/settings/equipments/data-table';
import { NewEquipmentForm } from '@/components/settings/equipments/new-equipment-form';

export default async function Page() {
  const equipments = await fetchEquipments();

  return (
    <>
      <div className="">
        <h2>Equipamentos cadastrados</h2>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex ml-auto">
              Novo
            </Button>
          </SheetTrigger>
          <SheetContent side={'right'}>
            <NewEquipmentForm />
          </SheetContent>
        </Sheet>
        <div className="container">
          <DataTable data={equipments} />
        </div>
      </div>
    </>
  );
}
