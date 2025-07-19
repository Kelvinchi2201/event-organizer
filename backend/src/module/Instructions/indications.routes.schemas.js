import { z } from "zod/v4";
import { indicationsSchema } from "./indications.schemas.js";



const indicationsIdSchema = z
  .string()
  .transform((val) => Number(val))
  .refine((val) => !isNaN(val), 'El id tiene que ser un numero');

export const createIndicationRouteSchema = {
  params: z.object({}),
  body: indicationsSchema.omit({ id: true, fecha_publicacion: true}),
  queries: z.object({}),
};


export const deleteIndicationRouteSchema = {
  params: z.object({ id: indicationsIdSchema }),
  body: z.object({}),
  queries: z.object({}),
};

export const updateIndicationsRouteSchema = {
  params: z.object({ id: indicationsIdSchema }),
  body: indicationsSchema.omit({ id: true, fecha_publicacion: true, events_id: true}),
  queries: z.object({}),
};

