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
            <h1>¡Bienvenido!</h1>
          </div>
          <div class="content">
            <p>Gracias por registrarte. Por favor, haz clic en el siguiente botón para verificar tu correo electrónico y activar tu cuenta.</p>
            <div class="button-container">
              <a href="${endpoint}/verify/${token}" class="button">Verificar Correo</a>
            </div>
            <p style="font-size: 14px; margin-top: 30px; color: #888;">Si no te registraste, puedes ignorar este correo.</p>
          </div>
          <div class="footer">
            <p>Nombre de la Aplicación</p>
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
      <body>
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
          <h2>Recuperación de contraseña</h2>
          <p>Has solicitado restablecer tu contraseña. Haz clic en el botón de abajo para cambiarla:</p>
          <a href="http://localhost:4321/changesPassword/${token}" style="background-color: #50C878; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Restablecer Contraseña</a>
          <p>Si no fuiste tú, ignora este correo. Este enlace expirará en 15 minutos.</p>
        </div>
      </body>
      </html>`,
  });

  res.status(200).json({ message: 'Si el correo existe, se enviará un enlace de recuperación.' });
});



export default usersRouter;

  
  