import { z } from 'zod/v4';

export const contactSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'El nombre es obligatorio'),
  email: z.email('Tiene que ser un correo valido.'),
  passwordHash: z.string(),
});
