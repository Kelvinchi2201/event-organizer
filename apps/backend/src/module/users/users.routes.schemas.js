import { z } from 'zod/v4';

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

export const createUserRouteSchema = {
  params: z.object({}),
  body: z.object({
    name: z.string().min(1, 'El nombre es obligatorio'),
    email: z.email(' tiene que ser un email valido.'),
    password: z
      .string()
      .regex(PASSWORD_REGEX, 'Mínimo 6 caracteres, 1 letra, 1 número y 1 símbolo.'),
  }),
  queries: z.object({}),
};

export const verifyUserRouteSchema = {
  params: z.object({}),
  body: z.object({
    token: z.jwt('Tiene que ser un token valido'),
  }),
  queries: z.object({}),
};

export const changesPasswordRouteSchema = {
  params: z.object({}),
  body: z.object({
    token: z.jwt('Tiene que ser un token valido'),
    password: z
      .string()
      .regex(PASSWORD_REGEX, 'Mínimo 6 caracteres, 1 letra, 1 número y 1 símbolo.'),
  }),
  queries: z.object({}),
};

export const forgotPasswordRouteSchema = {
  params: z.object({}),
  body: z.object({
    email: z.email('Tiene que ser un email válido.'),
  }),
  queries: z.object({}),
};