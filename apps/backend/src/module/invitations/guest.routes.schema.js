import { z } from 'zod/v4';
import { guestSchema } from './guests.schemas.js';




const guestIdSchema = z
  .string()
  .transform((val) => Number(val))
  .refine((val) => !isNaN(val), 'El id tiene que ser un numero');

export const getGuestByEventsIdRouteSchema = {
  params: z.object({events_id: guestIdSchema }),
  body: z.object({}),
  queries: z.object({}),
};

export const createGuestRouteSchema = {
  params: z.object({}),
  body: z.array(guestSchema.omit({ id: true, estado_asistencia: true, fecha_envio: true})),
  queries: z.object({}),
};

export const createIndicationsRouteSchema = {
  params: z.object({ id: guestIdSchema }),
  body: guestSchema.omit({ id: true, estado_asistencia: true, fecha_envio: true, events_id: true, guest_email: true}),
  queries: z.object({}),
};

export const deleteGuestRouteSchema = {
  params: z.object({ id: guestIdSchema }),
  body: z.object({}),
  queries: z.object({}),
};



export const verifyConfirmGuestRouteSchema = {
  params: z.object({}),
  body: z.object({
    token: z.jwt('Tiene que ser un token valido'),
  }),
  queries: z.object({}),
};

