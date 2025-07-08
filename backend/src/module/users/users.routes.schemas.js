import { z } from 'zod/v4';

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

export const createUserRouteSchema = {
  params: z.object({}),
  body: z.object({
    email: z.email(' tiene que ser un email valido.'),
    password: z
      .string()
      .regex(PASSWORD_REGEX, 'Mínimo 6 caracteres, 1 letra, 1 número y 1 símbolo.'),
  }),
  queries: z.object({}),
};
