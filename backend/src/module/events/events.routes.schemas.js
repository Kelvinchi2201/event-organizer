import { z } from 'zod/v4';
import { eventsSchema } from './events.schemas.js';




const eventsIdSchema = z
  .string()
  .transform((val) => Number(val))
  .refine((val) => !isNaN(val), 'El id tiene que ser un numero');

export const createEventsRouteSchema = {
  params: z.object({}),
  body: eventsSchema.omit({ id: true, fecha_creacion: true}),
  queries: z.object({}),
};

export const deleteEventsRouteSchema = {
  params: z.object({ id: eventsIdSchema }),
  body: z.object({}),
  queries: z.object({}),
};

export const updateEventsRouteSchema = {
  params: z.object({ id: eventsIdSchema }),
  body: eventsSchema.omit({ id: true, fecha_creacion: true, usuarios_id: true}),
  queries: z.object({}),
};
