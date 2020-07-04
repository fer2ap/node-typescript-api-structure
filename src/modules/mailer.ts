// eslint-disable-next-line no-unused-vars
import { createTransport, Transporter } from 'nodemailer';
import { mailerConfig } from '@config/mailer';
import path from 'path';
import hbs from 'nodemailer-express-handlebars';

var options = {
  viewEngine: {
    extname: '.hbs'
  },
  viewPath: path.resolve('./src/resources/mail/'),
  extName: '.html',
};

const transporter: Transporter = createTransport(mailerConfig);

// transporter.use('compile', hbs({
//   viewEngine: {
//     extname: '.handlebars',
//     layoutsDir: 'emailViews/layouts',
//     defaultLayout:  'main',
//     partialsDir: 'emailViews/',
//   },
//   viewPath: path.resolve('./src/resources/mail'),
//   extname: '.handlebars'
// }));

transporter.use('compile', hbs(options));

export const mailer = transporter;
