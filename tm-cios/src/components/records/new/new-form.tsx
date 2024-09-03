'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { createRecord } from '@/lib/actions';
import {
  columnNames,
  conditionType,
  shifts,
  statusType,
} from '@/lib/constants';
import { NewFormProps } from '@/lib/definitions';
import { baseRecordSchema, newRecordSchema } from '@/lib/schemas';
import { capitalizeName, cn, getFirstAndLastName } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Worker } from '@prisma/client';
import { CalendarIcon, Cross1Icon, TrashIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Check, ChevronsUpDown, PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { ManualSelector } from './manual-selector';

export function NewForm({ equipments, reasons, workers }: NewFormProps) {
  const router = useRouter();

  const uniqueCCs = Array.from(
    new Set(workers.map((worker) => worker.cc).filter((cc) => cc)),
  ).sort((a, b) => a.localeCompare(b));

  const uniqueManagers = Array.from(
    new Set(
      workers.map((worker) => worker.manager).filter((manager) => manager),
    ),
  ).sort((a, b) => a!.localeCompare(b!));

  const addRow = () => {
    append({
      status: '',
      equipmentType: '',
      description: '',
      serialNumber: '',
      patrimonyId: '',
      condition: '',
      reason: undefined,
      relatedNote: undefined,
    });
  };

  const [files, setFiles] = useState<File[] | any>([]);

  const onSubmit = async (values: z.infer<typeof newRecordSchema>) => {
    const attachments = new FormData();

    for (let i = 0; i < files!.length; i++) {
      attachments.append('files', files![i]);
    }

    const data = {
      record: values,
      attachments: attachments,
    };

    const wasCreated = await createRecord(data);

    if (!wasCreated.status) {
      toast({
        title: 'Erro ao cadastrar equipamento',
        description: wasCreated.message,
      });
    } else {
      toast({
        title: 'Equipamento cadastrado com sucesso',
        description: wasCreated.message,
      });
      router.push('/cios/records');
    }
  };

  function removeFile(indexToRemove: number) {
    const fileListArray = Array.from(files);
    const updatedFileList = fileListArray.filter(
      (_, index) => index !== indexToRemove,
    );
    setFiles(updatedFileList);
  }
  const [openDeliveredBy, setOpenDeliveredBy] = useState(false);
  const [openSupervisors, setOpenSupervisors] = useState(false);
  const [openBorrower, setOpenBorrower] = useState(false);
  const [openCC, setOpenCC] = useState(false);
  const [openManager, setOpenManager] = useState(false);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [selectedBorrowerDetails, setSelectedBorrowerDetails] =
    useState<Worker>();

  const [isManualSelectorEnabled, setIsManualSelectorEnabled] = useState(false);

  const handleManualSelectorChange = (isEnabled: boolean) => {
    setIsManualSelectorEnabled(isEnabled);
    form.setValue('supervisors', '');
  };

  const formSchema = isManualSelectorEnabled
    ? newRecordSchema
    : baseRecordSchema;

  const form = useForm<z.infer<typeof newRecordSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      deliveredBy: '',
      equipmentsArray: [{}],
      attachments: [],
      supervisors: '',
    },
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'equipmentsArray',
  });

  return (
    <>
      <Form {...form}>
        <div className="flex flex-col">
          <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 rounded-t-md border-b bg-background/80 px-4 backdrop-blur-sm">
            <h1 className="text-xl font-semibold">Novo registro</h1>
            <Button
              variant="default"
              size="sm"
              className="ml-auto gap-1.5 text-sm"
              onClick={addRow}
            >
              <PlusCircle className="size-3.5" />
              Linha
            </Button>
          </header>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            method="POST"
            className="space-y-8"
          >
            <main className="flex flex-col gap-4 overflow-auto rounded-b-md bg-background p-4 md:grid-cols-2 md:flex-row lg:grid-cols-3">
              <div
                className="relative flex-col items-start gap-8 md:flex"
                x-chunk="dashboard-03-chunk-0"
              >
                <div className="grid w-[22rem] items-start gap-6">
                  <fieldset className="grid gap-6 rounded-lg border p-4">
                    <legend className="-ml-1 px-1 text-sm font-medium">
                      Detalhes da entrega
                    </legend>
                    {/* DeliveredBy */}
                    <div className="grid">
                      <div className="flex items-end justify-between">
                        <div>
                          <FormLabel>Quem entregou ?</FormLabel>
                          <span className="ml-2 text-destructive">*</span>
                        </div>
                        <ManualSelector
                          onChange={handleManualSelectorChange}
                          onReset={() => {
                            form.setValue('deliveredBy', '');
                          }}
                        />
                      </div>
                      {isManualSelectorEnabled ? (
                        <>
                          {/* Manually DeliveredBy */}
                          <div>
                            <FormField
                              control={form.control}
                              name="deliveredBy"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      className="my-2 bg-background"
                                      placeholder="Nome do entregador"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    Usuário responsável pela entrega
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          {/* Deliver's Supervisors */}
                          <div className="mt-6 grid gap-3">
                            <FormField
                              control={form.control}
                              name="supervisors"
                              render={({ field }) => (
                                <FormItem className="flex flex-col">
                                  <FormLabel>
                                    Responsável do entregante
                                    <span className="ml-2 text-destructive">
                                      *
                                    </span>
                                  </FormLabel>
                                  <Popover
                                    open={openSupervisors}
                                    onOpenChange={setOpenSupervisors}
                                  >
                                    <PopoverTrigger asChild>
                                      <FormControl>
                                        <Button
                                          variant="outline"
                                          role="combobox"
                                          className={cn(
                                            'w-full justify-between',
                                            !field.value &&
                                              'text-muted-foreground',
                                          )}
                                        >
                                          {field.value
                                            ? capitalizeName(
                                                getFirstAndLastName(
                                                  workers.find((worker) => {
                                                    setSelectedBorrowerDetails(
                                                      worker,
                                                    );
                                                    return (
                                                      worker.id === field.value
                                                    );
                                                  })?.name!,
                                                ),
                                              )
                                            : 'Selecione o responsavel'}
                                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                      </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                      className="w-80 p-0"
                                      align="end"
                                    >
                                      <Command>
                                        <CommandInput placeholder="filtrar por..." />
                                        <CommandEmpty>
                                          Nenhum supervisor encontrado
                                        </CommandEmpty>
                                        <CommandGroup>
                                          <CommandList>
                                            {workers.map((worker) => (
                                              <CommandItem
                                                value={worker.name}
                                                key={worker.id}
                                                onSelect={() => {
                                                  form.setValue(
                                                    'supervisors',
                                                    worker.id,
                                                  );
                                                  setSelectedBorrowerDetails(
                                                    worker,
                                                  );
                                                  setOpenSupervisors(false);
                                                }}
                                              >
                                                <Check
                                                  className={cn(
                                                    'mr-2 h-4 w-4',
                                                    worker.id === field.value
                                                      ? 'opacity-100'
                                                      : 'opacity-0',
                                                  )}
                                                />
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
                                              </CommandItem>
                                            ))}
                                          </CommandList>
                                        </CommandGroup>
                                      </Command>
                                    </PopoverContent>
                                  </Popover>
                                  <FormDescription>
                                    Gestor ou responsável do entregador
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </>
                      ) : (
                        <FormField
                          control={form.control}
                          name="deliveredBy"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <div className="flex"></div>
                              <Popover
                                open={openDeliveredBy}
                                onOpenChange={setOpenDeliveredBy}
                              >
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      className={cn(
                                        'w-full justify-between',
                                        !field.value && 'text-muted-foreground',
                                      )}
                                    >
                                      {field.value
                                        ? (() => {
                                            const selectedWorker = workers.find(
                                              (worker) =>
                                                worker.id === field.value,
                                            );
                                            if (selectedWorker) {
                                              return selectedWorker.name;
                                            }
                                            return 'Selecione um usuário';
                                          })()
                                        : 'Selecione um usuário'}

                                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-80 p-0"
                                  align="center"
                                >
                                  <Command>
                                    <CommandInput placeholder="filtrar por..." />
                                    <CommandEmpty>
                                      Nenhum usuário encontrado
                                    </CommandEmpty>
                                    <CommandGroup>
                                      <CommandList>
                                        {workers.map((worker) => (
                                          <CommandItem
                                            value={worker.name}
                                            key={worker.id}
                                            onSelect={() => {
                                              form.setValue(
                                                'deliveredBy',
                                                worker.id,
                                              );
                                              setOpenDeliveredBy(false);
                                            }}
                                          >
                                            <Check
                                              className={cn(
                                                'mr-2 h-4 w-4',
                                                worker.id === field.value
                                                  ? 'opacity-100'
                                                  : 'opacity-0',
                                              )}
                                            />
                                            <div className="flex items-start gap-3 text-muted-foreground">
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
                                          </CommandItem>
                                        ))}
                                      </CommandList>
                                    </CommandGroup>
                                  </Command>
                                </PopoverContent>
                              </Popover>
                              <FormDescription>
                                Usuário responsável pela entrega
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </div>
                    {/* Borrower */}
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="borrower"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>
                              Comodatário (Utilizador)
                              <span className="ml-2 text-destructive">*</span>
                            </FormLabel>
                            <Popover
                              open={openBorrower}
                              onOpenChange={setOpenBorrower}
                            >
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                      'w-full justify-between',
                                      !field.value && 'text-muted-foreground',
                                    )}
                                  >
                                    {field.value
                                      ? workers.find((worker) => {
                                          setSelectedBorrowerDetails(worker);
                                          return worker.id === field.value;
                                        })?.name!
                                      : 'Selecione um comodatário'}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-80 p-0" align="end">
                                <Command>
                                  <CommandInput placeholder="filtrar por..." />
                                  <CommandEmpty>
                                    Nenhum comodatário encontrado
                                  </CommandEmpty>
                                  <CommandGroup>
                                    <CommandList>
                                      {workers.map((worker) => (
                                        <CommandItem
                                          value={worker.name}
                                          key={worker.id}
                                          onSelect={() => {
                                            form.setValue(
                                              'borrower',
                                              worker.id,
                                            );
                                            form.setValue(
                                              'costCenter',
                                              worker.cc,
                                            );
                                            form.setValue(
                                              'manager',
                                              worker.manager
                                                ? worker.manager
                                                : '',
                                            );
                                            setSelectedBorrowerDetails(worker);
                                            setOpenBorrower(false);
                                          }}
                                        >
                                          <Check
                                            className={cn(
                                              'mr-2 h-4 w-4',
                                              worker.id === field.value
                                                ? 'opacity-100'
                                                : 'opacity-0',
                                            )}
                                          />
                                          <div className="flex items-start gap-3 text-muted-foreground">
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
                                        </CommandItem>
                                      ))}
                                    </CommandList>
                                  </CommandGroup>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            <FormDescription>Destinatário</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {/* Cost Center */}
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="costCenter"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>
                              Centro de Custo
                              <span className="ml-2 text-destructive">*</span>
                            </FormLabel>
                            <Popover open={openCC} onOpenChange={setOpenCC}>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                      'w-80 justify-between',
                                      !field.value && 'text-muted-foreground',
                                    )}
                                  >
                                    <span className="truncate">
                                      {field.value
                                        ? uniqueCCs.find(
                                            (uniceCC) =>
                                              uniceCC === field.value,
                                          ) || 'Value not found'
                                        : 'Selecione um centro de custo'}
                                    </span>
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-80 p-0" align="end">
                                <Command>
                                  <CommandInput placeholder="filtrar por..." />
                                  <CommandEmpty>
                                    Nenhum centro de custo encontrado
                                  </CommandEmpty>
                                  <CommandGroup>
                                    <CommandList className="">
                                      {uniqueCCs.map((uniceCC) => (
                                        <CommandItem
                                          value={uniceCC}
                                          key={uniceCC}
                                          onSelect={() => {
                                            form.setValue(
                                              'costCenter',
                                              uniceCC,
                                            );
                                            setOpenCC(false);
                                          }}
                                        >
                                          <Check
                                            className={cn(
                                              'mr-2 h-4 w-4',
                                              uniceCC === field.value
                                                ? 'opacity-100'
                                                : 'opacity-0',
                                            )}
                                          />
                                          <div className="flex items-start gap-3 text-muted-foreground">
                                            <div className="grid w-60 gap-0.5">
                                              <p>
                                                <span className="text-le truncate font-medium text-foreground">
                                                  {uniceCC}
                                                </span>
                                              </p>
                                            </div>
                                          </div>
                                        </CommandItem>
                                      ))}
                                    </CommandList>
                                  </CommandGroup>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            <FormDescription>
                              Centro de custo do comodatário
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {/* Manager */}
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="manager"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>
                              Gestor
                              <span className="ml-2 text-destructive">*</span>
                            </FormLabel>
                            <Popover
                              open={openManager}
                              onOpenChange={setOpenManager}
                            >
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                      'w-full justify-between',
                                      !field.value && 'text-muted-foreground',
                                    )}
                                  >
                                    {field.value
                                      ? capitalizeName(
                                          getFirstAndLastName(
                                            uniqueManagers.find(
                                              (manager) =>
                                                manager === field.value,
                                            )!,
                                          ),
                                        )
                                      : 'Selecione um gestor'}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-80 p-0" align="end">
                                <Command>
                                  <CommandInput placeholder="filtrar por..." />
                                  <CommandEmpty>
                                    Nenhum gestor encontrado
                                  </CommandEmpty>
                                  <CommandGroup>
                                    <CommandList>
                                      {uniqueManagers.map((manager) => (
                                        <CommandItem
                                          value={manager!}
                                          key={manager!}
                                          onSelect={() => {
                                            form.setValue('manager', manager!);
                                            setOpenManager(false);
                                          }}
                                        >
                                          <Check
                                            className={cn(
                                              'mr-2 h-4 w-4',
                                              manager === field.value
                                                ? 'opacity-100'
                                                : 'opacity-0',
                                            )}
                                          />
                                          <div className="flex items-start gap-3 text-muted-foreground">
                                            <div className="grid gap-0.5">
                                              <p>
                                                <span className="font-medium text-foreground">
                                                  {capitalizeName(
                                                    getFirstAndLastName(
                                                      manager!,
                                                    ),
                                                  )}
                                                </span>
                                              </p>
                                            </div>
                                          </div>
                                        </CommandItem>
                                      ))}
                                    </CommandList>
                                  </CommandGroup>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            <FormDescription>
                              Gestor do comodatário
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {/* Date and Shifts */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2">
                        <FormField
                          control={form.control}
                          name="date"
                          render={({ field }) => (
                            <FormItem className="">
                              <FormLabel>Data</FormLabel>
                              <span className="ml-2 text-destructive">*</span>
                              <Popover
                                open={openDatePicker}
                                onOpenChange={setOpenDatePicker}
                              >
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={'outline'}
                                      className={cn(
                                        'w-full text-left font-normal',
                                        !field.value && 'text-muted-foreground',
                                      )}
                                      onClick={() => setOpenDatePicker(true)}
                                    >
                                      {field.value ? (
                                        format(field.value, 'PPP', {
                                          locale: ptBR,
                                        })
                                      ) : (
                                        <span>Selecione uma data</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-auto p-0"
                                  align="center"
                                >
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={(date) => {
                                      field.onChange(date);
                                      setOpenDatePicker(false);
                                    }}
                                    initialFocus
                                    modifiers={{
                                      disabled: [
                                        { after: new Date() },
                                        { dayOfWeek: [0, 6] },
                                      ],
                                    }}
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="col-span-1">
                        <FormField
                          control={form.control}
                          name="shifts"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Turno
                                <span className="ml-2 text-destructive">*</span>
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="">
                                    <SelectValue placeholder="Selecione o turno" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Turno</SelectLabel>
                                    {shifts.map((shift) => (
                                      <SelectItem
                                        key={shift.value}
                                        value={shift.value}
                                      >
                                        {shift.name}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </fieldset>

                  {/* Ticket Number & General Notes */}
                  <fieldset className="grid gap-6 rounded-lg border p-4">
                    <legend className="-ml-1 px-1 text-sm font-medium">
                      Chamado relacionado
                    </legend>
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="ticketNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Número do chamado (SATI)
                              <span className="ml-2 text-destructive">*</span>
                            </FormLabel>
                            <FormControl>
                              <InputOTP maxLength={5} {...field}>
                                <InputOTPGroup>
                                  <InputOTPSlot index={0} />
                                  <InputOTPSlot index={1} />
                                </InputOTPGroup>
                                <InputOTPGroup>
                                  <InputOTPSlot index={2} />
                                  <InputOTPSlot index={3} />
                                  <InputOTPSlot index={4} />
                                </InputOTPGroup>
                              </InputOTP>
                            </FormControl>
                            <FormDescription>
                              Número do chamado do SATI
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Observações gerais</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Observações gerais..."
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </fieldset>
                </div>
              </div>
              <div className="relative flex h-full min-h-[77vh] w-full flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
                <Badge
                  variant="outline"
                  className="absolute right-3 top-3 rounded-full bg-[#331e10] p-1 px-2 text-[#f09652]"
                >
                  Lista de materiais e equipamentos
                </Badge>
                <Table className="mt-5">
                  <TableHeader>
                    <TableRow>
                      {columnNames.map((column) => (
                        <TableHead key={column.value}>{column.name}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody className="">
                    {/* Equipment type */}
                    {fields.map((field, index) => (
                      <TableRow key={field.id}>
                        <TableCell>
                          <FormField
                            control={form.control}
                            name={`equipmentsArray.${index}.equipmentType`}
                            render={({ field }) => (
                              <FormItem>
                                <Select onValueChange={field.onChange}>
                                  <FormControl>
                                    <SelectTrigger className="w-32 bg-background capitalize">
                                      <SelectValue placeholder="Tipo de equipamento" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {equipments.map((equipment) => (
                                      <SelectItem
                                        key={equipment.id}
                                        value={equipment.id}
                                        className="capitalize"
                                      >
                                        {equipment.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </TableCell>

                        {/* Description */}
                        <TableCell>
                          <FormField
                            control={form.control}
                            name={`equipmentsArray.${index}.description`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    className="w-36 bg-background"
                                    placeholder="Hostname..."
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </TableCell>

                        {/* Serial Number */}
                        <TableCell>
                          <FormField
                            control={form.control}
                            name={`equipmentsArray.${index}.serialNumber`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    className="w-28 bg-background"
                                    placeholder="Service tag..."
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </TableCell>

                        {/* Patrimony */}
                        <TableCell>
                          <FormField
                            control={form.control}
                            name={`equipmentsArray.${index}.patrimonyId`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    className="w-20 bg-background"
                                    placeholder="011474..."
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </TableCell>

                        {/* Condition */}
                        <TableCell>
                          <FormField
                            control={form.control}
                            name={`equipmentsArray.${index}.condition`}
                            render={({ field }) => (
                              <FormItem>
                                <Select onValueChange={field.onChange}>
                                  <FormControl>
                                    <SelectTrigger className="w-24 bg-background">
                                      <SelectValue placeholder="Condição do equip." />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {conditionType.map((condition) => (
                                      <SelectItem
                                        key={condition.value}
                                        value={condition.name}
                                      >
                                        {condition.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </TableCell>

                        {/* Status/Flow */}
                        <TableCell>
                          <FormField
                            control={form.control}
                            name={`equipmentsArray.${index}.status`}
                            render={({ field }) => (
                              <FormItem>
                                <Select onValueChange={field.onChange}>
                                  <FormControl>
                                    <SelectTrigger className="w-28 bg-background">
                                      <SelectValue placeholder="Selecione um status" />
                                    </SelectTrigger>
                                  </FormControl>
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
                              </FormItem>
                            )}
                          />
                        </TableCell>

                        {/* Reason */}
                        <TableCell>
                          <FormField
                            control={form.control}
                            name={`equipmentsArray.${index}.reason`}
                            render={({ field }) => (
                              <FormItem>
                                <Select onValueChange={field.onChange}>
                                  <FormControl>
                                    <SelectTrigger className="w-36 bg-background">
                                      <SelectValue placeholder="Motivo..." />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {reasons.map((reason) => (
                                      <SelectItem
                                        key={reason.id}
                                        value={reason.name}
                                      >
                                        {reason.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </TableCell>

                        <TableCell>
                          <FormField
                            control={form.control}
                            name={`equipmentsArray.${index}.relatedNote`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Textarea
                                    placeholder="condicionamento do equipamento"
                                    className="resize-none"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </TableCell>
                        <TableCell>
                          {fields.length > 1 && (
                            <Button
                              type="button"
                              onClick={() => remove(index)}
                              className="rounded-full bg-red-800 p-1"
                            >
                              <TrashIcon className="m-1 h-5 w-5" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="flex-1">
                  <section className="mt-5">
                    <FormField
                      control={form.control}
                      name="attachments"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Anexos</FormLabel>
                          <FormControl>
                            <>
                              <Input
                                type="file"
                                name="files"
                                accept="image/*"
                                className="mt-3 h-10 w-full cursor-pointer resize-none rounded border bg-background p-2 text-foreground shadow-none focus-visible:ring-0"
                                multiple
                                onChange={(e) => setFiles(e.target.files)}
                              />
                            </>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="mb-12 grid grid-cols-5 gap-4">
                      {files &&
                        Array.from(files).map((file: any, index) => (
                          <div
                            key={index}
                            className="relative mt-8 items-center gap-4 rounded-lg border-2 border-primary text-sm text-foreground"
                          >
                            {file.type.startsWith('image/') ? (
                              <div className="flex items-center justify-center p-2">
                                <img
                                  src={URL.createObjectURL(file)}
                                  alt={file.name}
                                  style={{ width: '150px', height: 'auto' }}
                                  className="mx-auto mt-8 rounded-md"
                                />
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    removeFile(index);
                                  }}
                                  className="absolute right-1 top-1 rounded-full border bg-foreground p-1 font-bold text-primary-foreground"
                                >
                                  <Cross1Icon className="h-4 w-4" />
                                </button>
                              </div>
                            ) : (
                              <a
                                href={URL.createObjectURL(file)}
                                download={file.name}
                              >
                                {file.name}
                              </a>
                            )}
                          </div>
                        ))}
                    </div>
                  </section>
                </div>
                <div className="relative">
                  <Button
                    className="absolute bottom-0 w-full"
                    variant={'default'}
                    type="submit"
                  >
                    Finalizar registro
                  </Button>
                </div>
              </div>
            </main>
          </form>
        </div>
      </Form>
    </>
  );
}
