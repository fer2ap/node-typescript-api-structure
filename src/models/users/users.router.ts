// eslint-disable-next-line no-unused-vars
import express, { Application, Request, Response } from 'express';
import UserModel from './user.model';
// eslint-disable-next-line no-unused-vars
import { IUser } from '@models/users/users.types';

export function usersRouter (app: Application): void {
  const router = express.Router();
  router.get('/', async (request: Request, response: Response): Promise<Response> => {
    const userList: IUser[] = await UserModel.find({});
    return response.send(userList);
  });
  router.post('/register', async (request: Request, response: Response): Promise<Response> => {
    try {
      const { name, email } = request.body;
      const user = await UserModel.findOneOrCreate({
        name,
        email
      });
      user.password = undefined;
      return response.send(user);
    } catch (error) {
      return response.status(400).send('Error creating an user.');
    }
  });
  app.use('/auth', router);
}
