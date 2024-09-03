'use client';

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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ExtendsRecords, RecordsByUser } from '@/lib/definitions';
import { newRecordSchema } from '@/lib/schemas';
import { cn, formatLongDate } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Attachment, Worker } from '@prisma/client';
import { ChevronLeft, Rabbit } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { AssociatedSwitcher } from './associated-switcher';

type EditFormProps = {
  data: ExtendsRecords[];
  workers: Worker[];
};

export function Cards({ data, workers }: EditFormProps) {

  if (!data || data.length === 0) {
    return <p>No records found.</p>;
  }

  const uniqueManagers = Array.from(
    new Set(workers.map((worker) => worker.manager)),
  );
  const uniceCCs = Array.from(new Set(workers.map((worker) => worker.cc)));

  const form = useForm<z.infer<typeof newRecordSchema>>({
    resolver: zodResolver(newRecordSchema),
    defaultValues: {
      equipmentsArray: [{}],
    },
    mode: 'onChange',
  });

  return (
    <>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          <Form {...form}>
            <div className="flex items-center gap-4">
              <Link href={'/cios/workers'}>
                <Button variant="outline" size="icon" className="h-7 w-7">
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Back</span>
                </Button>
              </Link>
              <h1 className="flex-1 capitalize shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                {data[0]?.Borrower.name}
              </h1>
              <Badge
                variant="outline"
                className={cn(
                  'capitalize hover:cursor-pointer text-foreground opacity-90 ml-auto sm:ml-0',
                  {
                    'bg-green-500 hover:opacity-100 hover:bg-green-500':
                      data[0]?.Borrower.status === 'ativo',
                    'bg-red-500 hover:opacity-100 hover:bg-red-500':
                      data[0]?.Borrower.status === 'demitido',
                    'bg-yellow-500 hover:opacity-100 hover:bg-yellow-500':
                      data[0]?.Borrower.status === 'férias',
                  },
                )}
              >
                {data[0]?.Borrower.status}
              </Badge>
              {/* <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Button variant="outline" size="sm">
                  Discard
                </Button>
                <Button size="sm">Salvar alterações</Button>
              </div> */}
            </div>
            <div className="flex gap-4 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                {data.map((record) => (
                  <Card key={record.id} x-chunk="dashboard-07-chunk-0">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle>
                        Detalhes do registro REG-{record.id}
                      </CardTitle>
                      <CardDescription className="flex flex-col">
                        <span>
                          Criado em: {formatLongDate(record.createdAt)}
                        </span>
                        <span>Criado por: {record.CreatedBy.name}</span>
                      </CardDescription>
                      <CardDescription className="flex flex-col">
                        <span>
                          Última atualização: {formatLongDate(record.updatedAt)}
                        </span>
                        {data[0].UpdatedBy && (
                          <span>Atualizado por: {data[0].UpdatedBy.name}</span>
                        )}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="flex flex-col gap-4">
                      <fieldset className="grid gap-6 rounded-lg border p-4">
                        <legend className="-ml-1 px-1 text-sm font-medium">
                          <Label>Comodatário</Label>
                        </legend>
                        <div className="flex gap-3">
                          <FormField
                            control={form.control}
                            name="borrower"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nome</FormLabel>
                                <span className="ml-2 text-destructive">*</span>
                                <FormControl>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={record.borrowerId.toString()}
                                    disabled
                                  >
                                    <SelectTrigger className="items-start [&_[data-description]]:hidden w-48">
                                      <SelectValue placeholder="Selecione um comodatário" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {workers.map((worker) => (
                                        <SelectItem
                                          key={worker.id}
                                          value={worker.id.toString()}
                                        >
                                          <div className="flex items-start gap-3 text-muted-foreground">
                                            <Rabbit className="size-5" />
                                            <div className="grid gap-0.5">
                                              <p>
                                                <span className="font-medium text-foreground">
                                                  {worker.name}
                                                </span>
                                              </p>
                                              <p
                                                className="text-xs"
                                                data-description
                                              >
                                                {worker.email}
                                              </p>
                                            </div>
                                          </div>
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="costCenter"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Centro de custo</FormLabel>
                                <span className="ml-2 text-destructive">*</span>
                                <FormControl>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={data[0].Borrower.cc.toString()}
                                    disabled
                                  >
                                    <SelectTrigger className="items-start [&_[data-description]]:hidden w-80">
                                      <SelectValue placeholder="Selecione um comodatário" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {uniceCCs.map((uniceCC) => (
                                        <SelectItem
                                          key={uniceCC}
                                          value={uniceCC}
                                        >
                                          <div className="flex items-start gap-3 text-muted-foreground">
                                            <Rabbit className="size-5" />
                                            <div className="grid gap-0.5">
                                              <p>
                                                <span className="font-medium text-foreground">
                                                  {uniceCC}
                                                </span>
                                              </p>
                                              <p
                                                className="text-xs sr-only"
                                                data-description
                                              >
                                                {uniceCC}
                                              </p>
                                            </div>
                                          </div>
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="manager"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Gestor responsável</FormLabel>
                                <span className="ml-2 text-destructive">*</span>
                                <FormControl>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={data[0].Borrower.manager}
                                    disabled
                                  >
                                    <SelectTrigger className="items-start [&_[data-description]]:hidden w-48">
                                      <SelectValue placeholder="Selecione o gestor responsável" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {uniqueManagers.map((uniqueManager) => (
                                        <SelectItem
                                          key={uniqueManager}
                                          value={uniqueManager}
                                        >
                                          <div className="flex items-start gap-3 text-muted-foreground">
                                            <Rabbit className="size-5" />
                                            <div className="grid gap-0.5">
                                              <p>
                                                <span className="font-medium text-foreground">
                                                  {uniqueManager}
                                                </span>
                                              </p>
                                              <p
                                                className="text-xs sr-only"
                                                data-description
                                              >
                                                {uniqueManager}
                                              </p>
                                            </div>
                                          </div>
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </fieldset>

                      <fieldset className="grid gap-6 rounded-lg border p-4">
                        <legend className="-ml-1 px-1 text-sm font-medium">
                          <Label>Entregue por</Label>
                        </legend>
                        <div className="flex gap-3">
                          <FormField
                            control={form.control}
                            name="deliveredBy"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nome</FormLabel>
                                <span className="ml-2 text-destructive">*</span>
                                <FormControl>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={record.deliveredByWorkerId.toString()}
                                    disabled
                                  >
                                    <SelectTrigger className="items-start [&_[data-description]]:hidden w-48">
                                      <SelectValue placeholder="Selecione um comodatário" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {workers.map((worker) => (
                                        <SelectItem
                                          key={worker.id}
                                          value={worker.id.toString()}
                                        >
                                          <div className="flex items-start gap-3 text-muted-foreground">
                                            <Rabbit className="size-5" />
                                            <div className="grid gap-0.5">
                                              <p>
                                                <span className="font-medium text-foreground">
                                                  {worker.name}
                                                </span>
                                              </p>
                                              <p
                                                className="text-xs"
                                                data-description
                                              >
                                                {worker.email}
                                              </p>
                                            </div>
                                          </div>
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="costCenter"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Centro de custo</FormLabel>
                                <span className="ml-2 text-destructive">*</span>
                                <FormControl>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={data[0].DeliveredBy.cc.toString()}
                                    disabled
                                  >
                                    <SelectTrigger className="items-start [&_[data-description]]:hidden w-80">
                                      <SelectValue placeholder="Selecione um comodatário" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {uniceCCs.map((uniceCC) => (
                                        <SelectItem
                                          key={uniceCC}
                                          value={uniceCC}
                                        >
                                          <div className="flex items-start gap-3 text-muted-foreground">
                                            <Rabbit className="size-5" />
                                            <div className="grid gap-0.5">
                                              <p>
                                                <span className="font-medium text-foreground">
                                                  {uniceCC}
                                                </span>
                                              </p>
                                              <p
                                                className="text-xs sr-only"
                                                data-description
                                              >
                                                {uniceCC}
                                              </p>
                                            </div>
                                          </div>
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="manager"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Gestor</FormLabel>
                                <span className="ml-2 text-destructive">*</span>
                                <FormControl>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={data[0].DeliveredBy.manager}
                                    disabled
                                  >
                                    <SelectTrigger className="items-start [&_[data-description]]:hidden w-48">
                                      <SelectValue placeholder="Selecione o gestor responsável" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {uniqueManagers.map((uniqueManager) => (
                                        <SelectItem
                                          key={uniqueManager}
                                          value={uniqueManager}
                                        >
                                          <div className="flex items-start gap-3 text-muted-foreground">
                                            <Rabbit className="size-5" />
                                            <div className="grid gap-0.5">
                                              <p>
                                                <span className="font-medium text-foreground">
                                                  {uniqueManager}
                                                </span>
                                              </p>
                                              <p
                                                className="text-xs sr-only"
                                                data-description
                                              >
                                                {uniqueManager}
                                              </p>
                                            </div>
                                          </div>
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </fieldset>

                      {record.Attachment.length !== 0 && (
                        <fieldset className="grid gap-6 rounded-lg border p-4">
                          <legend className="-ml-1 px-1 text-sm font-medium">
                            <Label>Anexos</Label>
                          </legend>
                          <div className="flex gap-3">
                            {record.Attachment.map((attachment: Attachment) => {
                              const imagePath = `/attachments/${attachment.filename}`;

                              return (
                                <div
                                  key={attachment.id}
                                  className="flex flex-col items-center"
                                >
                                  <a
                                    href={imagePath}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <Image
                                      src={imagePath}
                                      alt={attachment.filename}
                                      width={200}
                                      height={200}
                                      className="max-w-full h-auto rounded-lg"
                                    />
                                  </a>
                                  {/* <CardDescription>
                                    {attachment.filename}
                                  </CardDescription> */}
                                </div>
                              );
                            })}
                          </div>
                        </fieldset>
                      )}

                      <fieldset className="flex flex-wrap gap-6 rounded-lg border p-4 items-center justify-center">
                        <legend className="-ml-1 px-1 text-sm font-medium">
                          <Label>Equipamentos</Label>
                        </legend>

                        {record.Equipment.map((equipment: any) => (
                          <div
                            key={equipment.id}
                            className="overflow-hidden mb-4 border rounded-lg"
                          >
                            <div className="w-96 divide-y divide-muted-foreground/15">
                              <div className="bg-background items-center gap-4 grid grid-cols-3 px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                <div className="text-foreground">
                                  {equipment.EquipmentType.name || 'N/A'}
                                </div>
                                <div>Detalhes</div>
                                <div>
                                  <AssociatedSwitcher
                                    equipmentId={equipment.id}
                                    serialNumber={equipment.serialNumber}
                                    patrimonyId={equipment.patrimonyNumber}
                                    isAssociated={equipment.isAssociated}
                                    userId={record.Borrower.id}
                                  />
                                </div>
                              </div>
                              <div className="bg-background divide-y divide-muted-foreground/15">
                                <div className="grid grid-cols-3 px-6 py-4 whitespace-nowrap text-sm">
                                  <div className="font-medium text-foreground">
                                    Descrição
                                  </div>
                                  <div className="text-muted-foreground">
                                    {equipment.description || 'N/A'}
                                  </div>
                                </div>
                                <div className="grid grid-cols-3 px-6 py-4 whitespace-nowrap text-sm">
                                  <div className="font-medium text-foreground">
                                    Patrimônio
                                  </div>
                                  <div className="text-muted-foreground">
                                    {equipment.patrimonyNumber || 'N/A'}
                                  </div>
                                </div>
                                <div className="grid grid-cols-3 px-6 py-4 whitespace-nowrap text-sm">
                                  <div className="font-medium text-foreground">
                                    Serial Number
                                  </div>
                                  <div className="text-muted-foreground">
                                    {equipment.serialNumber || 'N/A'}
                                  </div>
                                </div>
                                <div className="grid grid-cols-3 px-6 py-4 whitespace-nowrap text-sm">
                                  <div className="font-medium text-foreground">
                                    Condição
                                  </div>
                                  <div className="text-muted-foreground">
                                    {equipment.equipmentCondition || 'N/A'}
                                  </div>
                                </div>
                                <div className="grid grid-cols-3 px-6 py-4 whitespace-nowrap text-sm">
                                  <div className="font-medium text-foreground">
                                    Fluxo
                                  </div>
                                  <div className="text-muted-foreground">
                                    {equipment.flow || 'N/A'}
                                  </div>
                                </div>
                                <div className="grid grid-cols-3 px-6 py-4 whitespace-nowrap text-sm">
                                  <div className="font-medium text-foreground">
                                    Motivo
                                  </div>
                                  <div className="text-muted-foreground">
                                    {equipment.entryType || 'N/A'}
                                  </div>
                                </div>
                                <div className="grid grid-cols-3 px-6 py-4 whitespace-nowrap text-sm">
                                  <div className="font-medium text-foreground">
                                    Observações
                                  </div>
                                  <div className="text-muted-foreground text-wrap">
                                    {equipment.observations || 'N/A'}
                                  </div>
                                </div>
                                <div className="grid grid-cols-3 px-6 py-4 whitespace-nowrap text-sm">
                                  <div className="font-medium text-foreground">
                                    Criado em
                                  </div>
                                  <div className="text-muted-foreground">
                                    {equipment.createdAt
                                      ? formatLongDate(equipment.createdAt)
                                      : 'N/A'}
                                  </div>
                                </div>
                                <div className="grid grid-cols-3 px-6 py-4 whitespace-nowrap text-sm">
                                  <div className="font-medium text-foreground">
                                    Atualizado em
                                  </div>
                                  <div className="text-muted-foreground">
                                    {equipment.updatedAt
                                      ? formatLongDate(equipment.updatedAt)
                                      : 'N/A'}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </fieldset>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            {/* <div className="flex items-center justify-center gap-2 md:hidden">
              <Button variant="outline" size="sm">
                Descartar
              </Button>
              <Button size="sm">Salvar Alterações</Button>
            </div> */}
          </Form>
        </div>
      </main>
    </>
  );
}
