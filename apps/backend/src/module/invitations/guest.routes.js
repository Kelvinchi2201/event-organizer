import express from 'express'
import { createGuestRouteSchema, createIndicationsRouteSchema, getGuestByEventsIdRouteSchema, verifyConfirmGuestRouteSchema, deleteGuestRouteSchema } from "./guest.routes.schema.js";
import guestRepository from './guest.repository.js';
import jwt from 'jsonwebtoken';
import nodemailerService from '../../services/nodemailer.services.js';
import { endpoint } from '../../config/endpoints.js';
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);
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
  await resend.emails.send({
    from: 'E-Organizer <no-reply@eorganizer.lat>',
   to: guest.guest_email,
    subject: 'Confirma tu asistencia',
    html: `
      <!DOCTYPE html>
      <html lang="es">
      <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Confirmación de Asistencia</title>
      <style>
        body { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9fafb; }
        .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e5e7eb; }
        .header { background-color: #ffffff; padding: 40px; text-align: center; border-bottom: 1px solid #f3f4f6; }
        .header h1 { margin: 0; font-size: 24px; color: #1f2937; }
        .header span { color: #db2777; }
        .content { padding: 40px 30px; text-align: center; color: #4b5563; line-height: 1.6; }
        .content p { font-size: 18px; }
        .footer { background-color: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #9ca3af; }
      </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1><span style="color: #db2777;">E</span>Organizer</h1>
          </div>
          <div class="content">
            <h2 style="color: #1f2937;">¡Felicidades!</h2>
            <p>Has sido invitado al evento: <strong>${guest.event_name}</strong>. Por favor, confirma tu asistencia en el siguiente botón.</p>
            
            ${guest.indications ? `<p style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; font-size: 15px;"><strong>Indicaciones:</strong> ${guest.indications}</p>` : ''}
            
            <div style="margin-top: 30px;">
              <a href="${endpoint}/verifyGuest/${token}" 
                 style="background-color: #db2777; color: #ffffff !important; padding: 15px 30px; text-decoration: none; border-radius: 9999px; font-weight: bold; font-size: 16px; display: inline-block;">
                Confirmar Asistencia
              </a>
            </div>
            <p style="font-size: 14px; margin-top: 30px; color: #9ca3af;">Si no esperabas esta invitación, puedes ignorar este correo.</p>
          </div>
          <div class="footer">
            <p>${guest.event_name} | Gestionado con EOrganizer</p>
          </div>
        </div>
      </body>
      </html>
    `,
});
  }
res.status(200).json(newGuests);
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
    if (addIndications && addIndications.guest_email) {
    await nodemailerService.sendMail({
      from: process.env.EMAIL_USER,
      to: addIndications.guest_email, // Usamos tu variable original
      subject: 'Actualización de indicaciones para el evento',
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
        <meta charset="UTF-8">
        <title>Confirmación de Asistencia</title>
        <style>
          body { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4; }
          .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
          .header { background-color: #4A90E2; color: #ffffff; padding: 40px; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; }
          .content { padding: 40px 30px; text-align: center; color: #333333; line-height: 1.6; }
          .content p { font-size: 18px; }
          .footer { background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 12px; color: #777777; }
        </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Notificación de Actualización</h1>
            </div>
            <div class="content">
              <p>Hemos actualizado tus indicaciones especiales para nuestro evento. La nueva indicación registrada es:</p>
              <p><strong>"${body.indications}"</strong></p>
              <p style="font-size: 14px; margin-top: 30px; color: #888;">Si no solicitaste este cambio, por favor, contáctanos.</p>
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
  res.json(addIndications);
});

guestRouter.delete('/:id', async (req, res) => {
  const params = deleteGuestRouteSchema.params.parse(req.params);
  const guestDeleted = await guestRepository.deleteById(params.id);
  res.json(guestDeleted);
})


export default guestRouter;