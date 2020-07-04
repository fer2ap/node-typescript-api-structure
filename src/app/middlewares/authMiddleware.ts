// eslint-disable-next-line no-unused-vars
import { NextFunction, Response } from 'express';
// eslint-disable-next-line no-unused-vars
import { JsonWebTokenError, verify } from 'jsonwebtoken';
import { auth } from '@config/auth';
// eslint-disable-next-line no-unused-vars
import { IAuthMiddlewareRequest } from '../@types/IAuthMiddlewareRequest';

export function authMiddleware (request: IAuthMiddlewareRequest, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    return response.status(401).send({ error: 'No token provided' });
  }
  const parts = authHeader.split(' ');
  if (parts.length !== 2) {
    return response.status(401).send({ error: 'Token error' });
  }
  const [scheme, token] = parts;
  if (!/^Bearer$/.test(scheme)) {
    return response.status(401).send({ error: 'Token malformation' });
  }
  verify(token, auth.secret, (error:JsonWebTokenError, decoded: {id: string}) => {
    if (error) {
      return response.status(401).send({ error: 'Invalid token' });
    }
    request.userId = decoded.id;
    return next();
  });
}
