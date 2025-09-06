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
    html: `
      <!DOCTYPE html>
      <html lang="es">
      <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Confirmación de Asistencia</title>
      <style>
        body { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
        .header { background-color: #4A90E2; color: #ffffff; padding: 40px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; }
        .content { padding: 40px 30px; text-align: center; color: #333333; line-height: 1.6; }
        .content p { font-size: 18px; }
        .button-container { margin-top: 30px; }
        .button { background-color: #50C878; color: #ffffff; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px; display: inline-block; }
        .footer { background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 12px; color: #777777; }
      </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>¡Felicidades!</h1>
          </div>
          <div class="content">
            <p>Has sido invitado a nuestro evento. Por favor, haz clic en el siguiente botón para confirmar tu asistencia.</p>
            <div class="button-container">
              <a href="http://localhost:4321/verifyGuest/${token}" class="button">Confirmar Asistencia</a>
            </div>
            <p style="font-size: 14px; margin-top: 30px; color: #888;">Si no te registraste, puedes ignorar este correo.</p>
          </div>
          <div class="footer">
            <p>Nombre del Evento | Fecha | Lugar</p>
          </div>
        </div>
      </body>
      </html>
    `,
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
  const addIndications = await guestRepository.updateGuestById(params.id, body);
  res.json(addIndications);
});

guestRouter.delete('/:id', async (req, res) => {
  const params = deleteGuestRouteSchema.params.parse(req.params);
  const guestDeleted = await guestRepository.deleteById(params.id);
  res.json(guestDeleted);
})


export default guestRouter;