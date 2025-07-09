import express from 'express';
import { createUserRouteSchema } from './users.routes.schemas.js';
import usersRepository from './users.repository.js';
import bcrypt from 'bcrypt';

const usersRouter = express.Router();

usersRouter.get('/', async (req, res) => {
  const users = await usersRepository.getAll();
  res.json(users);
});

usersRouter.post('/', async (req, res) => {
  const body = createUserRouteSchema.body.parse(req.body);
  const passwordHash = await bcrypt.hash(body.password, 10);
  const newUser = await usersRepository.addOne({ email: body.email, passwordHash });
  res.json(newUser);
});

export default usersRouter;

  
  