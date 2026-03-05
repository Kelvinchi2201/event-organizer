import { z } from 'zod/v4';

export const commentsSchema = z.object({
    id: z.number(),
    comment: z.string().min(1, 'Comenta lo que quieras'),
    creationDate: z.iso.date(),
    userId: z.number(),
    eventId: z.number()
});


