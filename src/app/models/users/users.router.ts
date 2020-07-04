// eslint-disable-next-line no-unused-vars
import express, { Application, Request, Response } from 'express';
import UserModel from './user.model';
// eslint-disable-next-line no-unused-vars
import { IUser } from '@models/users/users.types';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { auth } from '@config/auth';
import { randomBytes } from 'crypto';
import { mailer } from '../../../modules/mailer';
import path from 'path';

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
        response.status(400).send({ error: 'Error on forgot password. User not found.' });
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
      // @ts-ignore
      await mailer.sendMail({
        to: email,
        from: 'fernandoADM@gmail.com',
        template: 'auth/forgot_password',
        context: { token }
      }, (error) => {
        if (error) {
          console.log(error);
          return response.status(400).send({ error: 'Couldnt send email with password recovery token' });
        }
        else {
          response.send({ message: 'Email for password recevery sent.' });
        }
      });
    } catch (error) {
      response.status(400).send({ error: 'Error on forgot password. Try again.' });
    }
  });
  app.use('/auth', router);
}
