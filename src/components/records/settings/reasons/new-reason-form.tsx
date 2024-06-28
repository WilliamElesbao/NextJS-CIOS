'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { createNewReason } from '@/lib/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const FormSchema = z.object({
  name: z.string().min(5, {
    message: 'O nome do motivo deve conter mais de 5 caracteres',
  }),
  description: z.string().min(8, {
    message: 'A descrição deve conter mais de 8 caracteres',
  }),
});

export function NewReasonForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    const wasCreated = await createNewReason(formData);
    if (!wasCreated.status) {
      return toast({
        title: 'Erro ao cadastrar motivo',
        description: wasCreated.message,
      });
    } else {
      return toast({
        title: 'Motivo cadastrado com sucesso',
        description: wasCreated.message,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do motivo</FormLabel>
              <FormControl>
                <Input placeholder="Ex.: Manutenção..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição do motivo</FormLabel>
              <FormControl>
                <Input placeholder="Manutenção interna" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Cadastrar</Button>
      </form>
    </Form>
  );
}
