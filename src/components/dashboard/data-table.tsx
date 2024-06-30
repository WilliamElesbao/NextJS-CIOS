import { Badge } from '@/components/ui/badge';
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
import { cn, formatLongDate } from '@/lib/utils';

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
                          {record.Borrower.name}
                        </div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {record.Borrower.email}
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge
                          className={cn(
                            'capitalize hover:cursor-pointer text-foreground opacity-90 w-24 flex justify-center',
                            {
                              'bg-green-500 hover:opacity-100 hover:bg-green-500':
                                record.Borrower.status === 'ativo',
                              'bg-red-500 hover:opacity-100 hover:bg-red-500':
                                record.Borrower.status === 'demitido',
                              'bg-yellow-500 hover:opacity-100 hover:bg-yellow-500':
                                record.Borrower.status === 'férias',
                            },
                          )}
                        >
                          {record.Borrower.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {record.CreatedBy.name}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {formatLongDate(record.createdAt)}
                      </TableCell>
                      <TableCell className="text-right">
                        {record.ticketCode}
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
