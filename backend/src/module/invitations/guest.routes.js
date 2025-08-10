import express from 'express'
import { createGuestRouteSchema, createIndicationsRouteSchema, verifyConfirmGuestRouteSchema } from "./guest.routes.schema.js";
import guestRepository from './guest.repository.js';
import jwt from 'jsonwebtoken';
import nodemailerService from '../../services/nodemailer.services.js';

const guestRouter = express.Router()




guestRouter.post('/', async (req, res) => {
  const body = createGuestRouteSchema.body.parse(req.body);
  const newGuest = await guestRepository.addOneGuest(body);
    const token = jwt.sign(
    { id: newGuest.id, email: newGuest.guest_email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '10m' },
  );
  await nodemailerService.sendMail({
    from: process.env.EMAIL_USER,
    to: body.guest_email,
    subject: 'Verifica tu correo',
    html: `<a href="http://localhost:4321/verifyGuest/${token}">Verifica tu correo</a>`,
  });

  res.sendStatus(200);
});

guestRouter.patch('/verifyGuest', async (req, res) => {
  const body = verifyConfirmGuestRouteSchema.body.parse(req.body);
  const decodedToken = jwt.verify(body.token, process.env.REFRESH_TOKEN_SECRET);
  await guestRepository.verifyAttendance({ id: decodedToken.id });
  res.status(200).json({ message: 'Su asistencia ha sido confirmada exitosamente' });
});

  
guestRouter.patch('/:id', async (req, res) => {
  const body = createIndicationsRouteSchema.body.parse(req.body);
  const params = createIndicationsRouteSchema.params.parse(req.params);
  const addIndications = await guestRepository.addIndicationsById(params.id, body);
  res.json(addIndications);
});


export default guestRouter;