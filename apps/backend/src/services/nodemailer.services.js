import { createTransport } from 'nodemailer';

const nodemailerService = createTransport({
  host: 'smtp.resend.com',
  port: 465,
  secure: true, 
  auth: {
    user: 'resend', 
    pass: process.env.RESEND_API_KEY, 
  },
});

export default nodemailerService;