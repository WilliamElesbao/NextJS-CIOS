import { z } from 'zod';

export const equipmentSchema = z.object({
  equipmentType: z.string().min(1, { message: 'Selecione um equipamento' }),
  description: z
    .string()
    .min(5, { message: 'Insira uma descrição, minimo de 5 caracteres' }),
  serialNumber: z
    .string()
    .min(5, { message: 'Insira o Serial, minimo de 5 caracteres' }),
  patrimonyId: z.string().min(5, {
    message: 'Insira o número de Patrimônio, minimo de 5 caracteres',
  }),
  condition: z.string().min(1, { message: 'Selecione a condição equipamento' }),
  status: z.string().min(1, { message: 'Selecione um status' }),
  reason: z.string().optional(),
  relatedNote: z.string().optional(),
});

export const newRecordSchema = z.object({
  deliveredBy: z.string().min(1, { message: 'Selecione um usuário' }),
  borrower: z.string().min(1, { message: 'Selecione um comodatário' }),
  costCenter: z.string().min(1, { message: 'Selecione um centro de custo' }),
  manager: z.string().min(1, { message: 'Selecione um gestor responsável' }),
  date: z.date({ required_error: 'Selecione uma data' }),
  shifts: z.string().min(1, { message: 'Selecione um turno' }),
  ticketNumber: z.string().min(5, {
    message: 'Informe o número do chamado (SATI)',
  }),
  notes: z.string().optional(),
  equipmentsArray: z.array(equipmentSchema),
  attachments: z.array(z.string()).optional(),
});
