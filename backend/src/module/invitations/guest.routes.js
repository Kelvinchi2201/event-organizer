import express from 'express'
import { createGuestRouteSchema, createIndicationsRouteSchema, getGuestByEventsIdRouteSchema, verifyConfirmGuestRouteSchema, deleteGuestRouteSchema } from "./guest.routes.schema.js";
import guestRepository from './guest.repository.js';
import jwt from 'jsonwebtoken';
import nodemailerService from '../../services/nodemailer.services.js';

const guestRouter = express.Router();

guestRouter.get('/', async (req, res) => {
  const guestList = await guestRepository.getAll();
  res.status(200).json(guestList)
});

guestRouter.get('/events/:events_id', async (req, res) => {
  const params = getGuestByEventsIdRouteSchema.params.parse(req.params);
  const getGuestListByEventId = await guestRepository.getByEventId(params.events_id);
  res.status(200).json(getGuestListByEventId);
});

guestRouter.get('/events/:events_id/count', async (req, res) => {
  const params = getGuestByEventsIdRouteSchema.params.parse(req.params);
  const getGuestListByEventId = await guestRepository.countByEventId(params.events_id);
  res.status(200).json({ count: getGuestListByEventId});
});

guestRouter.post('/', async (req, res) => {
  const body = createGuestRouteSchema.body.parse(req.body);
  const newGuests = [];
  for (const guest of body) {
    const newGuest = await guestRepository.addOneGuest(guest);
    newGuests.push(newGuest);

    const token = jwt.sign(
    { id: newGuest.id, email: newGuest.guest_email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '10m' },
  );
  await nodemailerService.sendMail({
    from: process.env.EMAIL_USER,
    to: guest.guest_email,
    subject: 'Verifica tu correo',
    html: `<a href="http://localhost:4321/verifyGuest/${token}">Verifica tu correo</a>`,
  });
}
  res.sendStatus(200).json(newGuests);
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

guestRouter.delete('/:id', async (req, res) => {
  const params = deleteGuestRouteSchema.params.parse(req.params);
  const guestDeleted = await guestRepository.deleteById(params.id);
  res.json(guestDeleted);
})


export default guestRouter;