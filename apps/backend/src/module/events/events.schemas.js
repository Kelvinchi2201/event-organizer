import {z} from 'zod/v4';

export const eventsSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    fecha_evento: z.iso.date(),
    hora_evento: z.string().regex(/^\d{2}:\d{2}$/),
    portada_url: z.string().nullable(), 
    usuarios_id: z.number(),
    fecha_creacion: z.iso.datetime()

})