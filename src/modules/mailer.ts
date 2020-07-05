import { createTransport } from 'nodemailer';
import { mailerConfig } from '@config/mailer';

export const transporter = createTransport(mailerConfig);
