import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { ExtendsRecords } from '@/lib/definitions';
import { cn, formatLongDate } from '@/lib/utils';
import { Attachment } from '@prisma/client';
import { MoreVertical } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface DetailsCardProps {
  lastRecord: ExtendsRecords | null;
}

export function DetailsCard({ lastRecord }: DetailsCardProps) {
  if (!lastRecord) {
    return <div>Nenhum registro encontrado</div>;
  }

  return (
    <>
      <div>
        <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
          <CardHeader className="flex flex-row items-start bg-muted/50">
            <div className="grid gap-0.5">
              <CardTitle className="group flex items-center gap-2 text-lg">
                Registro {lastRecord!.id}
              </CardTitle>
              <CardDescription>
                Criado por: {lastRecord!.CreatedBy.name}{' '}
                {formatLongDate(lastRecord!.createdAt)}
              </CardDescription>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="outline" className="h-8 w-8">
                    <MoreVertical className="h-3.5 w-3.5" />
                    <span className="sr-only">More</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link
                      href={`/cios/workers/${lastRecord!.Borrower.id}/edit`}
                      className="cursor-pointer"
                    >
                      Ir para detalhes
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="p-6 text-sm">
            <div className="grid gap-3">
              <div className="font-semibold flex justify-between">
                <span>Comodatário</span>
                <Badge
                  className={cn(
                    'capitalize hover:cursor-pointer text-foreground opacity-90 w-16 flex justify-center',
                    {
                      'bg-green-500 hover:opacity-100 hover:bg-green-500':
                        lastRecord!.Borrower.status === 'ativo',
                      'bg-red-500 hover:opacity-100 hover:bg-red-500':
                        lastRecord!.Borrower.status === 'demitido',
                      'bg-yellow-500 hover:opacity-100 hover:bg-yellow-500':
                        lastRecord!.Borrower.status === 'férias',
                    },
                  )}
                >
                  {lastRecord!.Borrower.status}
                </Badge>
              </div>
              <dl className="grid gap-3">
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Nome</dt>
                  <CardDescription className="capitalize">
                    {lastRecord!.Borrower.name}
                  </CardDescription>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Email</dt>
                  <dd>
                    <CardDescription className="lowercase">
                      {lastRecord!.Borrower.email}
                    </CardDescription>
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Centro de Custo</dt>
                  <dd>
                    <CardDescription className="uppercase">
                      {lastRecord!.Borrower.cc}
                    </CardDescription>
                  </dd>
                </div>
              </dl>
            </div>

            <Separator className="my-4" />

            <div className="grid gap-3">
              <div className="font-semibold">Equipamentos (Check-in)</div>
              <ul className="grid gap-3">
                {lastRecord!.Equipment.filter(
                  (equipment) => equipment.flow === 'checkIn',
                ).length > 0 ? (
                  lastRecord!.Equipment.filter(
                    (equipment) => equipment.flow === 'checkIn',
                  ).map((equipment) => (
                    <li
                      key={equipment.id}
                      className="flex items-center justify-between"
                    >
                      <span className="text-muted-foreground">
                        {equipment.EquipmentType.name} → {equipment.description}
                      </span>
                      <span>{equipment.equipmentCondition}</span>
                    </li>
                  ))
                ) : (
                  <CardDescription>Nenhuma entrada</CardDescription>
                )}
              </ul>
              <Separator className="my-2" />
              <div className="font-semibold">Equipamentos (Check-out)</div>
              <ul className="grid gap-3">
                {lastRecord!.Equipment.filter(
                  (equipment) => equipment.flow === 'checkOut',
                ).length > 0 ? (
                  lastRecord!.Equipment.filter(
                    (equipment) => equipment.flow === 'checkOut',
                  ).map((equipment) => (
                    <li
                      key={equipment.id}
                      className="flex items-center justify-between"
                    >
                      <span className="text-muted-foreground">
                        {equipment.EquipmentType.name} → {equipment.description}
                      </span>
                      <span>{equipment.equipmentCondition}</span>
                    </li>
                  ))
                ) : (
                  <CardDescription>Nenhuma saída</CardDescription>
                )}
              </ul>
              <Separator className="my-2" />
              <div className="font-semibold">Anexos</div>
              <div className="grid grid-cols-4">
                {lastRecord!.Attachment.length > 0 ? (
                  lastRecord!.Attachment.map((attachment: Attachment) => {
                    const imagePath = `/attachments/${attachment.filename}`;

                    return (
                      <div key={attachment.id} className="">
                        <Link
                          href={imagePath}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Image
                            src={imagePath}
                            alt={attachment.filename}
                            width={100}
                            height={100}
                            className="max-w-full h-auto rounded-lg"
                          />
                        </Link>
                      </div>
                    );
                  })
                ) : (
                  <CardDescription className="text-nowrap">
                    Nenhum anexo
                  </CardDescription>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
