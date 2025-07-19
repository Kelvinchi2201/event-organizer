import { z } from "zod/v4";



export const indicationsSchema = z.object({
    id: z.number(),
    titulo: z.string(),
    descripcion: z.string(),
    fecha_publicacion: z.iso.datetime(),
    events_id: z.number()
})