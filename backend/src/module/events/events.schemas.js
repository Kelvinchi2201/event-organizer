import {date, z} from 'zod/v4';






export const eventsSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    fecha_evento: z.iso.date(),
    hora_evento: z.iso.time(),
    usuarios_id: z.number(),
    fecha_creacion: z.iso.datetime()

    // fecha_evento: z.string().regex(DATE_REGEX, 'La fecha debe estar en formato DD/MM/YYYY'),
    // hora_evento: z.string().regex(TIME_REGEX, 'La hora debe estar en formato HH:MM'),


})