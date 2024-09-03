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
import { createNewEquipment } from '@/lib/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const FormSchema = z.object({
  name: z.string().min(2, {
    message: 'O nome do equipamento deve conter mais de 2 caracteres',
  }),
  description: z.string().min(8, {
    message: 'A descrição deve conter mais de 8 caracteres',
  }),
});

export function NewEquipmentForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    const wasCreated = await createNewEquipment(formData);
    if (!wasCreated.status) {
      return toast({
        title: 'Erro ao cadastrar equipamento',
        description: wasCreated.message,
      });
    } else {
      return toast({
        title: 'Equipamento cadastrado com sucesso',
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
              <FormLabel>Nome do equipamento</FormLabel>
              <FormControl>
                <Input placeholder="Notebook" {...field} />
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
              <FormLabel>Descrição do equipamento</FormLabel>
              <FormControl>
                <Input placeholder="Notebook Dell" {...field} />
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
