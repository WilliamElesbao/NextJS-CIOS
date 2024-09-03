import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExtendsRecords } from '@/lib/definitions';
import {
  capitalizeName,
  formatLongDate,
  getFirstAndLastName,
} from '@/lib/utils';
import { UserStatus } from '../user-status';
import Link from 'next/link';
import { Button } from '../ui/button';

interface DataTableProps {
  lastFiveRecords: ExtendsRecords[];
}

export function DataTable({ lastFiveRecords }: DataTableProps) {
  return (
    <>
      <Tabs defaultValue="lastFive">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="lastFive">Últimos 5 registros</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="lastFive">
          <Card x-chunk="dashboard-05-chunk-3">
            <CardHeader className="px-7">
              <CardTitle>Records</CardTitle>
              <CardDescription>
                Exibe os últimos 5 registros criados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-left">Registro</TableHead>
                    <TableHead>Comodatário</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Comodatário status
                    </TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Criado por
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Criado em
                    </TableHead>
                    <TableHead className="text-right">Número SATI</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lastFiveRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="text-left">{record.id}</TableCell>
                      <TableCell>
                        <div className="font-medium">
                          {capitalizeName(
                            getFirstAndLastName(record.Borrower.name!),
                          )}
                        </div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {record.Borrower.email}
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <UserStatus condition={record.Borrower.status} />
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {record.CreatedBy.name}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {formatLongDate(record.createdAt)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Link
                          href={`http://sati.tmsa.ind.br/glpi/front/ticket.form.php?id=${record.ticketCode}`}
                          target={'_blank'}
                          className="cursor pointer"
                        >
                          <Button variant={'link'} className="p-0">
                            {record.ticketCode}
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
