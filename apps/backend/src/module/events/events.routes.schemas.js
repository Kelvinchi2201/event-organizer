import { z } from 'zod/v4';
import { eventsSchema } from './events.schemas.js';




const eventsIdSchema = z
  .string()
  .transform((val) => Number(val))
  .refine((val) => !isNaN(val), 'El id tiene que ser un numero');

export const createEventsRouteSchema = {

  body: eventsSchema.omit({ id: true, fecha_creacion: true, portada_url: true}).extend({
    usuarios_id: z.string().transform((val) => Number(val)).refine((val) => !isNaN(val), 'El usuarios_id tiene que ser un numero'),
  }),
  queries: z.object({}),
};

export const getEventsByIdRouteSchema = {
  params: z.object({usuarios_id: eventsIdSchema }),
  body: z.object({}),
  queries: z.object({}),
}

export const deleteEventsRouteSchema = {
  params: z.object({ id: eventsIdSchema }),
  body: z.object({}),
  queries: z.object({}),
};

// 👈🏼 El cambio está aquí
export const updateEventsRouteSchema = {
  params: z.object({ id: eventsIdSchema }),
  body: eventsSchema.partial().omit({ id: true, fecha_creacion: true, usuarios_id: true}),
  queries: z.object({}),
};
