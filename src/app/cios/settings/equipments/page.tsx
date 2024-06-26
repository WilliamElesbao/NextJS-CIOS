import { NewEquipmentForm } from '@/components/records/settings/equipments/new-equipment-form';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { fetchEquipments } from '@/lib/data';

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

        <ul>
          <li>
            {equipments.map((equipment) => (
              <li>{equipment.name}</li>
            ))}
          </li>
        </ul>
      </div>
    </>
  );
}
