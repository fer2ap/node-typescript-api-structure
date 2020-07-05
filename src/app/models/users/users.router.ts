// eslint-disable-next-line no-unused-vars
import express, { Application, Request, Response } from 'express';
import UserModel from './user.model';
// eslint-disable-next-line no-unused-vars
import { IUser } from '@models/users/users.types';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { auth } from '@config/auth';
import { randomBytes } from 'crypto';
import { transporter } from '../../../modules/mailer';
// eslint-disable-next-line no-unused-vars
import { MailOptions } from 'nodemailer/lib/sendmail-transport';

function generateToken (user: IUser): String {
  return sign({ id: user.id }, auth.secret, {
    expiresIn: 86400
  });
}

export function usersRouter (app: Application): void {
  const router = express.Router();
  router.get('/', async (request: Request, response: Response): Promise<Response> => {
    const userList: IUser[] = await UserModel.find({});
    return response.send(userList);
  });
  router.post('/register', async (request: Request, response: Response): Promise<Response> => {
    try {
      const { name, email, password } = request.body;
      const user = await UserModel.create({ name, email, password });
      user.password = undefined;
      const token = generateToken(user);
      return response.send({ user, token });
    } catch (error) {
      return response.status(400).send('Error creating an user. Email already registered.');
    }
  });
  router.post('/authenticate', async (request:Request, response: Response): Promise<Response> => {
    const { email, password } = request.body;
    const user: IUser = await UserModel.findOne({ email }).select('+password');
    if (!user) {
      return response.status(400).send({ error: 'User or password invalid.' });
    }
    if (!await compare(password, user.password)) {
      return response.status(400).send({ error: 'User or password invalid.' });
    }
    user.password = undefined;
    const token = generateToken(user);
    return response.status(200).send({ user, token });
  });
  router.post('/forgot_password', async (request:Request, response: Response): Promise<Response> => {
    const { email } = request.body;
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        return response.status(400).send({ error: 'Error on forgot password. User not found.' });
      }
      const token = randomBytes(20).toString('hex');
      const now = new Date();
      now.setHours(now.getHours() + 1);
      await UserModel.findByIdAndUpdate(user.id, {
        $set: {
          passwordResetToken: token,
          passwordResetTokenExpires: now
        }
      });
      const mailOptions: MailOptions = {
        to: 'Emma@gmail.com',
        from: 'Fernando@gmail.com',
        sender: 'Fernando Pinto',
        text: `This is your token for recovering your password : ${token}`,
        html: `<h1>Forgot your passaword?</h1><br><p>Use this token for recovery</p><br><p><b>${token}</b></p>`
      };
      await transporter.sendMail(mailOptions, error => {
        if (error) {
          return response.status(400).send({ error: 'Error sending email. Try again.' });
        } else {
          return response.send({ message: 'Email for password recovery sent.' });
        }
      });
    } catch (error) {
      return response.status(400).send({ error: 'Error on forgot password. Try again.' });
    }
  });
  router.post('/reset_password', async (request:Request, response: Response): Promise<Response> => {
    const { email, token, password } = request.body;
    try {
      const user = await UserModel
        .findOne({ email })
        .select('+passwordResetToken passwordResetTokenExpires');
      if (!user) {
        return response.status(400).send({ error: 'Email not registered' });
      }
      if (user.passwordResetToken !== token) {
        return response.status(400).send({ error: 'Invalid token.' });
      }
      const now = Date.now();
      if (user.passwordResetTokenExpires.valueOf() < now) {
        return response.status(400).send({ error: 'Token expired.' });
      }
      user.password = password;
      await user.save();
      return response.send({ message: 'Password reset.' });
    } catch (error) {
      return response.status(400).send({ error: 'Couldnt process password reset' });
    }
  });
  app.use('/auth', router);
}
