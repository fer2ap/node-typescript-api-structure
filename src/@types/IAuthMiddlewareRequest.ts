// eslint-disable-next-line no-unused-vars
import { Request } from 'express';

export interface IAuthMiddlewareRequest extends Request{
  userId: string;
}
