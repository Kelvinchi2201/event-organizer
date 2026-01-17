import express from 'express';
import { ZodError } from 'zod/v4';
import { ErrorWithStatus } from './src/utils/errorTypes.js';
import { DatabaseError } from 'pg';
import cors from 'cors';
import usersRouter from './src/module/users/users.routes.js';
import eventsRouter from './src/module/events/events.routes.js';
import jwt from 'jsonwebtoken';
import authRouter from './src/module/auth/auth.routes.js';
import cookieParser from 'cookie-parser';
import guestRouter from './src/module/invitations/guest.routes.js';
import path from 'path';
import { handler as ssrHandler } from './dist/server/entry.mjs';


const app = express();

app.use(cors({ credentials: true, origin: ['http://localhost:4321'] }));
app.use(express.json());
app.use(cookieParser());



app.use('/api/users', usersRouter);
app.use('/api/events', eventsRouter);
app.use('/api/guest', guestRouter)
app.use('/api/auth', authRouter);


app.use((err, req, res, _next) => {
  console.log('error', err);
    if (err instanceof jwt.TokenExpiredError) {
    return res.status(403).json({ error: 'El tiempo para validar su usuario ha expirado' });
  }

  if (err instanceof ZodError) {
    const messages = err.issues.map((zodError) => zodError.message);
    const message = messages.join(',\n');
    return res.status(400).json({ error: message });
  }

  if (err instanceof ErrorWithStatus) {
    return res.status(err.status).json({ error: err.message });
  }

  if (err instanceof DatabaseError) {
    if (err.code === '22P02') {
      return res.status(400).json({ error: 'Hubo un error. Contacte al administrador' });
    }
  }

  res.json({ error: 'HUBO UN ERROR' });
});

app.use(express.static(path.join(import.meta.dirname, 'dist', 'client')));
app.use(ssrHandler);
export default app;
