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
  equipmentName: z.string().min(2, {
    message: 'O nome do equipamento deve conter mais de 2 caracteres',
  }),
  equipmentDescription: z.string().min(10, {
    message: 'A descrição deve conter mais de 10 caracteres',
  }),
});

export function NewEquipmentForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      equipmentName: '',
      equipmentDescription: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const wasCreated = await createNewEquipment(data);
    if (!wasCreated.status) {
      return toast({
        title: 'Erro',
        description: wasCreated.message,
      });
    } else {
      return toast({
        title: 'Cadastrado',
        description: wasCreated.message,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="equipmentName"
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
          name="equipmentDescription"
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

