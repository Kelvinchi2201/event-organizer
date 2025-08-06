import {z} from 'zod/v4';

export const guestSchema = z.object({
    id: z.number(),
    fecha_envio: z.iso.datetime(),
    guest_name: z.string(),
    estado_asistencia: z.boolean(),
    events_id: z.number(),
    indications: z.string().optional()


})