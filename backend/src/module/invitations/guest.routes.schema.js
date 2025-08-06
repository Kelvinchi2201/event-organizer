import { z } from 'zod/v4';
import { guestSchema } from './guests.schemas.js';




const guestIdSchema = z
  .string()
  .transform((val) => Number(val))
  .refine((val) => !isNaN(val), 'El id tiene que ser un numero');

export const createGuestRouteSchema = {
  params: z.object({}),
  body: guestSchema.omit({ id: true, estado_asistencia: true, fecha_envio: true}),
  queries: z.object({}),
};

export const deleteGuestRouteSchema = {
  params: z.object({ id: guestIdSchema }),
  body: z.object({}),
  queries: z.object({}),
};

