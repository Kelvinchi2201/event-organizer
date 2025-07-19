import express from 'express';
import { ZodError } from 'zod/v4';
import { ErrorWithStatus } from './src/utils/errorTypes.js';
import { DatabaseError } from 'pg';
import usersRouter from './src/module/users/users.routes.js';
import eventsRouter from './src/module/events/events.routes.js';
import indicationsRouter from './src/module/Instructions/indications.routes.js';

const app = express();


app.use(express.json());

app.get('/', (req, res) => {
  res.json({ hola: 'mundo' });
});

app.use('/api/users', usersRouter);
app.use('/api/events', eventsRouter);
app.use('/api/indications', indicationsRouter)

app.use((err, req, res, _next) => {
  console.log('error', err);

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

export default app;
