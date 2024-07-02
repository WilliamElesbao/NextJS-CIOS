import { DataTable } from '@/components/settings/reasons/data-table';
import { NewReasonForm } from '@/components/settings/reasons/new-reason-form';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { fetchReasons } from '@/lib/data';

export default async function Page() {
  const reasons = await fetchReasons();

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
            <NewReasonForm />
          </SheetContent>
        </Sheet>
        <DataTable data={reasons} />
        {/* <ul>
          {reasons.map((reason) => (
            <li key={reason.id}>{reason.name}</li>
          ))}
        </ul> */}
      </div>
    </>
  );
}
