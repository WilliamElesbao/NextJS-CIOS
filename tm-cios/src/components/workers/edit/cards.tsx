'use client';

import { EquipmentConditionStatus } from '@/components/equipment-condition-status';
import { FlowStatus } from '@/components/flow-status';
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { UserStatus } from '@/components/user-status';
import {
  updateEquipmentConditionStatus,
  updateEquipmentFlowStatus,
} from '@/lib/actions';
import { conditionType, statusType } from '@/lib/constants';
import { ExtendsRecords } from '@/lib/definitions';
import { newRecordSchema } from '@/lib/schemas';
import {
  capitalizeName,
  formatLongDate,
  getFirstAndLastName,
} from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Attachment, Worker } from '@prisma/client';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { AssociatedSwitcher } from './associated-switcher';
import { ImageComponent } from './image-component';

type EditFormProps = {
  data: ExtendsRecords[];
  workers: Worker[];
  isAdmin: boolean;
};

export function Cards({ data, workers, isAdmin }: EditFormProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  if (!data || data.length === 0) {
    return <p>No records found.</p>;
  }

  const uniqueCCs = Array.from(
    new Set(workers.map((worker) => worker.cc).filter((cc) => cc)),
  ).sort((a, b) => a.localeCompare(b));

  const uniqueManagers = Array.from(
    new Set(
      workers.map((worker) => worker.manager).filter((manager) => manager),
    ),
  ).sort((a, b) => a!.localeCompare(b!));

  const form = useForm<z.infer<typeof newRecordSchema>>({
    resolver: zodResolver(newRecordSchema),
    defaultValues: {
      equipmentsArray: [{}],
    },
    mode: 'onChange',
  });

  const updateFlowStatus = async (newFlow: string, equipmentId: number) => {
    const wasUpdated = await updateEquipmentFlowStatus(newFlow, equipmentId);

    if (!wasUpdated.status) {
      toast({
        title: 'Erro ao atuailzar status',
        description: wasUpdated.message,
      });
    } else {
      toast({
        title: 'Status atualizado com sucesso',
        description: wasUpdated.message,
      });
      setIsOpen(false);
    }
  };

  const updateConditionStatus = async (
    newCondition: string,
    equipmentId: number,
  ) => {
    const wasUpdated = await updateEquipmentConditionStatus(
      newCondition,
      equipmentId,
    );

    if (!wasUpdated.status) {
      toast({
        title: 'Erro ao atuailzar a condição',
        description: wasUpdated.message,
      });
    } else {
      toast({
        title: 'condição atualizada com sucesso',
        description: wasUpdated.message,
      });
      setIsOpen(false);
    }
  };

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
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold capitalize tracking-tight sm:grow-0">
                {capitalizeName(getFirstAndLastName(data[0]?.Borrower.name))}
              </h1>
              <UserStatus condition={data[0]?.Borrower.status} />
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
                                    <SelectTrigger className="w-60 items-start [&_[data-description]]:hidden">
                                      <SelectValue placeholder="Selecione um comodatário" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {workers.map((worker) => (
                                        <SelectItem
                                          key={worker.id}
                                          value={worker.id.toString()}
                                        >
                                          <div className="flex items-start gap-3 text-muted-foreground">
                                            <div className="grid gap-0.5">
                                              <p>
                                                <span className="font-medium text-foreground">
                                                  {capitalizeName(
                                                    getFirstAndLastName(
                                                      worker.name,
                                                    ),
                                                  )}
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
                                    <SelectTrigger className="w-80 items-start [&_[data-description]]:hidden">
                                      <SelectValue placeholder="Selecione um comodatário" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {uniqueCCs.map((uniceCC) => (
                                        <SelectItem
                                          key={uniceCC}
                                          value={uniceCC}
                                        >
                                          <div className="flex items-start gap-3 text-muted-foreground">
                                            <div className="grid gap-0.5">
                                              <p>
                                                <span className="font-medium text-foreground">
                                                  {uniceCC}
                                                </span>
                                              </p>
                                              <p
                                                className="sr-only text-xs"
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
                                    defaultValue={data[0].Borrower.manager!}
                                    disabled
                                  >
                                    <SelectTrigger className="w-60 items-start [&_[data-description]]:hidden">
                                      <SelectValue placeholder="Selecione o gestor responsável" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {uniqueManagers.map((uniqueManager) => (
                                        <SelectItem
                                          key={uniqueManager}
                                          value={uniqueManager!}
                                        >
                                          <div className="flex items-start gap-3 text-muted-foreground">
                                            <div className="grid gap-0.5">
                                              <p>
                                                <span className="font-medium text-foreground">
                                                  {capitalizeName(
                                                    getFirstAndLastName(
                                                      uniqueManager!,
                                                    ),
                                                  )}
                                                </span>
                                              </p>
                                              <p
                                                className="sr-only text-xs"
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
                          <Label>Quem entregou ?</Label>
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
                                    <SelectTrigger className="w-60 items-start [&_[data-description]]:hidden">
                                      <SelectValue placeholder="Selecione um comodatário" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {workers.map((worker) => (
                                        <SelectItem
                                          key={worker.id}
                                          value={worker.id.toString()}
                                        >
                                          <div className="flex items-start gap-3 text-muted-foreground">
                                            <div className="grid gap-0.5">
                                              <p>
                                                <span className="font-medium text-foreground">
                                                  {capitalizeName(
                                                    getFirstAndLastName(
                                                      worker.name,
                                                    ),
                                                  )}
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
                                    <SelectTrigger className="w-80 items-start [&_[data-description]]:hidden">
                                      <SelectValue placeholder="Selecione um comodatário" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {uniqueCCs.map((uniceCC) => (
                                        <SelectItem
                                          key={uniceCC}
                                          value={uniceCC}
                                        >
                                          <div className="flex items-start gap-3 text-muted-foreground">
                                            <div className="grid gap-0.5">
                                              <p>
                                                <span className="font-medium text-foreground">
                                                  {uniceCC}
                                                </span>
                                              </p>
                                              <p
                                                className="sr-only text-xs"
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
                                    defaultValue={data[0].DeliveredBy.manager!}
                                    disabled
                                  >
                                    <SelectTrigger className="w-60 items-start [&_[data-description]]:hidden">
                                      <SelectValue placeholder="Selecione o gestor responsável" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {uniqueManagers.map((uniqueManager) => (
                                        <SelectItem
                                          key={uniqueManager}
                                          value={uniqueManager!}
                                        >
                                          <div className="flex items-start gap-3 text-muted-foreground">
                                            <div className="grid gap-0.5">
                                              <p>
                                                <span className="font-medium text-foreground">
                                                  {capitalizeName(
                                                    getFirstAndLastName(
                                                      uniqueManager!,
                                                    ),
                                                  )}
                                                </span>
                                              </p>
                                              <p
                                                className="sr-only text-xs"
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
                          <div className="grid grid-cols-4 gap-7">
                            {record.Attachment.map((attachment: Attachment) => {
                              return (
                                <div
                                  key={attachment.id}
                                  className="flex flex-col items-center"
                                >
                                  <ImageComponent
                                    filename={attachment.filename}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </fieldset>
                      )}

                      <fieldset className="flex flex-wrap items-center justify-center gap-6 rounded-lg border p-4">
                        <legend className="-ml-1 px-1 text-sm font-medium">
                          <Label>Equipamentos</Label>
                        </legend>

                        {record.Equipment.map((equipment: any) => (
                          <div
                            key={equipment.id}
                            className="mb-4 overflow-hidden rounded-lg border"
                          >
                            <div className="w-96 divide-y divide-muted-foreground/15">
                              <div className="grid grid-cols-3 items-center gap-4 bg-background px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
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
                              <div className="divide-y divide-muted-foreground/15 bg-background">
                                <div className="grid grid-cols-3 whitespace-nowrap px-6 py-4 text-sm">
                                  <div className="font-medium text-foreground">
                                    Descrição
                                  </div>
                                  <div className="text-muted-foreground">
                                    {equipment.description || 'N/A'}
                                  </div>
                                </div>
                                <div className="grid grid-cols-3 whitespace-nowrap px-6 py-4 text-sm">
                                  <div className="font-medium text-foreground">
                                    Patrimônio
                                  </div>
                                  <div className="text-muted-foreground">
                                    {equipment.patrimonyNumber || 'N/A'}
                                  </div>
                                </div>
                                <div className="grid grid-cols-3 whitespace-nowrap px-6 py-4 text-sm">
                                  <div className="font-medium text-foreground">
                                    Serial Number
                                  </div>
                                  <div className="text-muted-foreground">
                                    {equipment.serialNumber || 'N/A'}
                                  </div>
                                </div>
                                <div className="grid grid-cols-3 whitespace-nowrap px-6 py-4 text-sm">
                                  <div className="font-medium text-foreground">
                                    Condição
                                  </div>
                                  <div className="text-muted-foreground">
                                    {isAdmin ? (
                                      <>
                                        <Popover>
                                          <PopoverTrigger className="w-full">
                                            {(
                                              <EquipmentConditionStatus
                                                condition={
                                                  equipment.equipmentCondition
                                                }
                                              />
                                            ) || 'N/A'}
                                          </PopoverTrigger>
                                          <PopoverContent
                                            side="right"
                                            className="w-auto"
                                          >
                                            <Label>Altere a condição</Label>
                                            <Select
                                              onValueChange={(
                                                newFlowStatus,
                                              ) => {
                                                updateConditionStatus(
                                                  newFlowStatus,
                                                  equipment.id,
                                                );
                                              }}
                                              defaultValue={
                                                equipment.equipmentCondition ||
                                                'N/A'
                                              }
                                            >
                                              <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Selecione uma condição" />
                                              </SelectTrigger>
                                              <SelectContent>
                                                {conditionType.map(
                                                  (condition) => (
                                                    <SelectItem
                                                      key={condition.value}
                                                      value={condition.name}
                                                    >
                                                      {condition.name}
                                                    </SelectItem>
                                                  ),
                                                )}
                                              </SelectContent>
                                            </Select>
                                            <FormMessage />
                                          </PopoverContent>
                                        </Popover>
                                      </>
                                    ) : (
                                      <>
                                        {(
                                          <EquipmentConditionStatus
                                            condition={
                                              equipment.equipmentCondition
                                            }
                                          />
                                        ) || 'N/A'}
                                      </>
                                    )}
                                  </div>
                                </div>
                                <div className="grid grid-cols-3 whitespace-nowrap px-6 py-4 text-sm">
                                  <div className="font-medium text-foreground">
                                    Fluxo
                                  </div>
                                  <div className="text-muted-foreground">
                                    {isAdmin ? (
                                      <>
                                        <Popover>
                                          <PopoverTrigger className="w-full">
                                            {(
                                              <FlowStatus
                                                condition={equipment.flow}
                                              />
                                            ) || 'N/A'}
                                          </PopoverTrigger>
                                          <PopoverContent
                                            side="right"
                                            className="w-auto"
                                          >
                                            <Label>Altere o status</Label>
                                            <Select
                                              onValueChange={(
                                                newFlowStatus,
                                              ) => {
                                                updateFlowStatus(
                                                  newFlowStatus,
                                                  equipment.id,
                                                );
                                              }}
                                              defaultValue={
                                                equipment.flow || 'N/A'
                                              }
                                            >
                                              <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Selecione a função" />
                                              </SelectTrigger>
                                              <SelectContent>
                                                {statusType.map((status) => (
                                                  <SelectItem
                                                    key={status.value}
                                                    value={status.value}
                                                  >
                                                    {status.name}
                                                  </SelectItem>
                                                ))}
                                              </SelectContent>
                                            </Select>
                                            <FormMessage />
                                          </PopoverContent>
                                        </Popover>
                                      </>
                                    ) : (
                                      <>
                                        {(
                                          <FlowStatus
                                            condition={equipment.flow}
                                          />
                                        ) || 'N/A'}
                                      </>
                                    )}
                                  </div>
                                </div>
                                <div className="grid grid-cols-3 whitespace-nowrap px-6 py-4 text-sm">
                                  <div className="font-medium text-foreground">
                                    Motivo
                                  </div>
                                  <div className="text-muted-foreground">
                                    {equipment.entryType || 'N/A'}
                                  </div>
                                </div>
                                <div className="grid grid-cols-3 whitespace-nowrap px-6 py-4 text-sm">
                                  <div className="font-medium text-foreground">
                                    Observações
                                  </div>
                                  <div className="text-wrap text-muted-foreground">
                                    {equipment.observations || 'N/A'}
                                  </div>
                                </div>
                                <div className="grid grid-cols-3 whitespace-nowrap px-6 py-4 text-sm">
                                  <div className="font-medium text-foreground">
                                    Criado em
                                  </div>
                                  <div className="text-muted-foreground">
                                    {equipment.createdAt
                                      ? formatLongDate(equipment.createdAt)
                                      : 'N/A'}
                                  </div>
                                </div>
                                <div className="grid grid-cols-3 whitespace-nowrap px-6 py-4 text-sm">
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
