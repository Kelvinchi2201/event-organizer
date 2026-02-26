import express from 'express';
import { changesPasswordRouteSchema, createUserRouteSchema, verifyUserRouteSchema, forgotPasswordRouteSchema } from './users.routes.schemas.js';
import usersRepository from './users.repository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailerService from '../../services/nodemailer.services.js';
import { endpoint } from '../../config/endpoints.js';
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);


const usersRouter = express.Router();

usersRouter.get('/', async (req, res) => {
  const users = await usersRepository.getAll();
  res.json(users);
});

usersRouter.post('/', async (req, res) => {
  const body = createUserRouteSchema.body.parse(req.body);
  const passwordHash = await bcrypt.hash(body.password, 10);
  const newUser = await usersRepository.addOne({ name: body.name, email: body.email, passwordHash });
  const token = jwt.sign(
    { id: newUser.id, email: newUser.email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '10m' },
  );
  await resend.emails.send({
    from: 'E-Organizer <no-reply@eorganizer.lat>',
    to: body.email,
    subject: 'Verifica tu correo',
    html: `<!DOCTYPE html>
      <html lang="es">
      <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verificación de Correo Electrónico</title>
      <style>
        body { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9fafb; }
        .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e5e7eb; }
        .header { background-color: #ffffff; padding: 40px; text-align: center; border-bottom: 1px solid #f3f4f6; }
        .header h1 { margin: 0; font-size: 28px; color: #1f2937; }
        .header span { color: #db2777; }
        .content { padding: 40px 30px; text-align: center; color: #4b5563; line-height: 1.6; }
        .content p { font-size: 18px; }
        .button-container { margin-top: 30px; }
        .button { background-color: #db2777; color: #ffffff; padding: 15px 30px; text-decoration: none; border-radius: 9999px; font-weight: bold; font-size: 16px; display: inline-block; }
        .footer { background-color: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #9ca3af; }
      </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1><span>E</span>Organizer</h1>
          </div>
          <div class="content">
            <p>Gracias por registrarte. Por favor, haz clic en el siguiente botón para verificar tu correo electrónico y activar tu cuenta.</p>
            <div class="button-container">
              <a href="${endpoint}/verify/${token}" 
   style="background-color: #db2777; color: #ffffff !important; padding: 15px 30px; text-decoration: none; border-radius: 9999px; font-weight: bold; font-size: 16px; display: inline-block;">
   Verificar Correo
</a>
            </div>
            <p style="font-size: 14px; margin-top: 30px; color: #9ca3af;">Si no te registraste, puedes ignorar este correo.</p>
          </div>
          <div class="footer">
            <p>&copy; 2026 EOrganizer - Gestión de eventos sencilla</p>
          </div>
        </div>
      </body>
      </html>`,
});

res.sendStatus(200);
});

usersRouter.patch('/verify', async (req, res) => {
  const body = verifyUserRouteSchema.body.parse(req.body);
  const decodedToken = jwt.verify(body.token, process.env.REFRESH_TOKEN_SECRET);
  await usersRepository.verifyOne({ id: decodedToken.id });
  res.status(200).json({ message: 'Su correo ha sido verificado exitosamente' });
});


usersRouter.patch('/changesPassword', async (req, res) => {
  const body = changesPasswordRouteSchema.body.parse(req.body);
  const decodedToken = jwt.verify(body.token, process.env.REFRESH_TOKEN_SECRET);
  const passwordHash = await bcrypt.hash(body.password, 10);
  await usersRepository.changePassword({id: decodedToken.id, passwordHash});
  res.status(200).json({ message: 'su contraseña ha sido cambiada exitosamente'});
});

usersRouter.post('/forgotPassword', async (req, res) => {
  const body = forgotPasswordRouteSchema.body.parse(req.body);

  const user = await usersRepository.findByEmail({ email: body.email });
  
  if (!user) {
    return res.status(200).json({ message: 'Si el correo existe, se enviará un enlace de recuperación.' });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '15m' },
  );

 await resend.emails.send({
    from: 'E-Organizer <no-reply@eorganizer.lat>',
    to: body.email,
    subject: 'Recupera tu contraseña',
    html: `<!DOCTYPE html>
      <html lang="es">
      <head>
      <style>
        body { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9fafb; }
        .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e5e7eb; text-align: center; }
        .header { padding: 30px; border-bottom: 1px solid #f3f4f6; }
        .header h1 { margin: 0; font-size: 24px; color: #1f2937; }
        .header span { color: #db2777; }
        .content { padding: 40px 30px; color: #4b5563; line-height: 1.6; }
        .button { background-color: #db2777; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 9999px; font-weight: bold; display: inline-block; margin: 20px 0; }
        .footer { font-size: 12px; color: #9ca3af; margin-top: 20px; }
      </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1><span>E</span>Organizer</h1>
          </div>
          <div class="content">
            <h2 style="color: #1f2937;">Recuperación de contraseña</h2>
            <p>Has solicitado restablecer tu contraseña. Haz clic en el botón de abajo para cambiarla:</p>
            <a href="${endpoint}/changesPassword/${token}"  style="background-color: #db2777; color: #ffffff !important; padding: 15px 30px; text-decoration: none; border-radius: 9999px; font-weight: bold; font-size: 16px; display: inline-block;">Restablecer Contraseña</a>
            <p style="font-size: 14px; color: #9ca3af;">Si no fuiste tú, ignora este correo. Este enlace expirará en 15 minutos.</p>
          </div>
        </div>
      </body>
      </html>`,
});
});



export default usersRouter;

  
  