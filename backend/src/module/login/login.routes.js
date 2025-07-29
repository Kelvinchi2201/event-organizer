import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { logInRouteSchema } from './login.routes.schema.js';
import usersRepository from '../users/users.repository.js';
import { ErrorWithStatus } from '../../utils/errorTypes.js';
const loginRoutes = express.Router();

loginRoutes.post('/', async (req, res) => {
  const body = logInRouteSchema.body.parse(req.body);
  const user = await usersRepository.findByEmail({ email: body.email });
  const isPasswordValid = user ? await bcrypt.compare(body.password, user.passwordhash) : false;
  if (!user|| !isPasswordValid) throw new ErrorWithStatus(400, 'Usuario o contraseña invalida');
  
  res.sendStatus(200);
});

export default loginRoutes;