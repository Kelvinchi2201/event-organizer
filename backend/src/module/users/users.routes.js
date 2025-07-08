import express from 'express';
import { createUserRouteSchema } from './users.routes.schemas.js';
import usersRepository from './users.repository.js';

const usersRouter = express.Router();

usersRouter.post('/', async (req, res) => {
  const body = createUserRouteSchema.body.parse(req.body);
  const newUser = await usersRepository.addOne({ email: body.email, passwordHash: body.password });
  res.json(newUser);
});

export default usersRouter;
