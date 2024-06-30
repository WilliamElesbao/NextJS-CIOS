'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
import { newRecordSchema } from '@/lib/schemas';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, TrashIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { PlusCircle, Rabbit } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

export function NewForm({ equipments, reasons, workers }: NewFormProps) {
  const router = useRouter();
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

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'equipmentsArray',
  });

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

  const [rows, setRows] = useState([{ id: 1 }]);

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
      // redirect user to /
      router.push('/cios/records');
    }
  };

  return (
    <>
      <Form {...form}>
        <div className="flex flex-col">
          <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b px-4 rounded-t-md backdrop-blur-sm bg-background/80">
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
            <main className="flex flex-col md:flex-row gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3 bg-background rounded-b-md">
              <div
                className="relative flex-col items-start gap-8 md:flex"
                x-chunk="dashboard-03-chunk-0"
              >
                <div className="grid items-start gap-6 w-[22rem]">
                  <fieldset className="grid gap-6 rounded-lg border p-4">
                    <legend className="-ml-1 px-1 text-sm font-medium">
                      Detalhes da entrega
                    </legend>
                    {/* DeliveredBy */}
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="deliveredBy"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Entregue por</FormLabel>
                            <span className="ml-2 text-destructive">*</span>
                            <FormControl>
                              <Select onValueChange={field.onChange}>
                                <SelectTrigger className="items-start [&_[data-description]]:hidden">
                                  <SelectValue placeholder="Selecione um usuário" />
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
                    </div>
                    {/* Borrower*/}
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="borrower"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Comodatário</FormLabel>
                            <span className="ml-2 text-destructive">*</span>
                            <FormControl>
                              <Select onValueChange={field.onChange}>
                                <SelectTrigger className="items-start [&_[data-description]]:hidden">
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
                    </div>
                    {/* Cost Center*/}
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="costCenter"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Centro de custo</FormLabel>
                            <span className="ml-2 text-destructive">*</span>
                            <FormControl>
                              <Select onValueChange={field.onChange}>
                                <SelectTrigger className="items-start [&_[data-description]]:hidden">
                                  <SelectValue placeholder="Selecione um centro de custo" />
                                </SelectTrigger>
                                <SelectContent>
                                  {uniceCCs.map((uniceCC) => (
                                    <SelectItem key={uniceCC} value={uniceCC}>
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
                    </div>
                    {/* Manager*/}
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="manager"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gestor responsável</FormLabel>
                            <span className="ml-2 text-destructive">*</span>
                            <FormControl>
                              <Select onValueChange={field.onChange}>
                                <SelectTrigger className="items-start [&_[data-description]]:hidden">
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
                    {/* Date and Shifts */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="date"
                          render={({ field }) => (
                            <FormItem className="">
                              <FormLabel>Data</FormLabel>
                              <span className="ml-2 text-destructive">*</span>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={'outline'}
                                      className={cn(
                                        'w-full text-left font-normal',
                                        !field.value && 'text-muted-foreground',
                                      )}
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
                                  align="start"
                                >
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
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
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="shifts"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Turno</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="w-auto">
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
                            <FormLabel>Número do chamado (SATI)</FormLabel>
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
                                placeholder="Tell us a little bit about yourself"
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
              <div className="relative flex h-full min-h-[77vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2 w-full">
                <Badge variant="outline" className="absolute right-3 top-3">
                  Materiais entregues
                </Badge>
                <Table className="mt-5">
                  <TableHeader>
                    <TableRow>
                      {columnNames.map((column) => (
                        <TableHead key={column.value}>{column.name}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
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
                                    <SelectTrigger className="w-full bg-background">
                                      <SelectValue placeholder="Tipo de equipamento" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {equipments.map((equipment) => (
                                      <SelectItem
                                        key={equipment.id}
                                        value={equipment.id}
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
                        <TableCell>
                          <FormField
                            control={form.control}
                            name={`equipmentsArray.${index}.description`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    className="w-full bg-background"
                                    placeholder="Monitor 24 pol..."
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </TableCell>
                        <TableCell>
                          <FormField
                            control={form.control}
                            name={`equipmentsArray.${index}.serialNumber`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    className="w-full bg-background"
                                    placeholder="SERIALX69666..."
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </TableCell>
                        <TableCell>
                          <FormField
                            control={form.control}
                            name={`equipmentsArray.${index}.patrimonyId`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    className="w-full bg-background"
                                    placeholder="011474..."
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </TableCell>
                        <TableCell>
                          <FormField
                            control={form.control}
                            name={`equipmentsArray.${index}.condition`}
                            render={({ field }) => (
                              <FormItem>
                                <Select onValueChange={field.onChange}>
                                  <FormControl>
                                    <SelectTrigger className="w-full bg-background">
                                      <SelectValue placeholder="Condição do equipamento" />
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
                        <TableCell>
                          <FormField
                            control={form.control}
                            name={`equipmentsArray.${index}.status`}
                            render={({ field }) => (
                              <FormItem>
                                <Select onValueChange={field.onChange}>
                                  <FormControl>
                                    <SelectTrigger className="w-full bg-background">
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
                        <TableCell>
                          <FormField
                            control={form.control}
                            name={`equipmentsArray.${index}.reason`}
                            render={({ field }) => (
                              <FormItem>
                                <Select onValueChange={field.onChange}>
                                  <FormControl>
                                    <SelectTrigger className="w-full bg-background">
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
                              variant="destructive"
                              onClick={() => remove(index)}
                              className="rounded-full p-1 opacity-80 hover:opacity-100"
                            >
                              <TrashIcon className="w-5 h-5 m-1" />
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
                                className="bg-background text-foreground border rounded p-2 w-full resize-none shadow-none focus-visible:ring-0 mt-3 h-10 cursor-pointer"
                                multiple
                                onChange={(e) => setFiles(e.target.files)} // TODO: fix this
                              />
                            </>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
