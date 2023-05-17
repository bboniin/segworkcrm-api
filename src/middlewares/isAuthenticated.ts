import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken'
import authConfig from "./../utils/auth"

interface Payload {
  sub: string;
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {

  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({ message: 'Token não enviado' });
  }

  const [, token] = authToken.split(' ');

  try {

    const { sub } = verify(
      token,
      authConfig.jwt.secret,
    ) as Payload

    req.userId = sub;

    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Internal server Error' });
  }

  return next();
}
