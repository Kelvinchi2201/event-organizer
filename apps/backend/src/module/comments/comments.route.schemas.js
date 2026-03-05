import { z } from 'zod/v4';
import { commentsSchema } from './comments.schemas.js';

const commentsIdSchema = z
  .string()
  .transform((val) => Number(val))
  .refine((val) => !isNaN(val), 'El id tiene que ser un numero');


export const createCommentsRouteSchema = {
    params: z.object({}),
    body: commentsSchema.omit({ id: true, creationDate: true }),
    queries: z.object({})
};

export const deleteCommentsRouteSchema = {
    params: z.object({ id: commentsIdSchema }),
    body: z.object({}),
    queries: z.object({})
};

export const updateCommentsRouteSchema = {
  params: z.object({ id: commentsIdSchema }),
  body: commentsSchema.partial().omit({ id: true, creationDate: true, usuariosId: true, eventsId: true }),
  queries: z.object({})
};