import {z} from 'zod/v4';

export const guestSchema = z.object({
    id: z.number(),
    fecha_envio: z.iso.datetime(),
    guest_name: z.string(),
    estado_asistencia: z.boolean(),
    events_id: z.number(),
    guest_email: z.email("tiene que ser un email valido."),
    indications: z.string().optional()


});