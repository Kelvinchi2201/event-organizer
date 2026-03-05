import { z } from 'zod/v4';

export const commentsSchema = z.object({
    id: z.number(),
    contenido: z.string().min(1, 'Comenta lo que quieras'),
    creationDate: z.iso.date(),
    usuariosId: z.number(),
    eventsId: z.number()
});


