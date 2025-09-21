import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { ENV } from '../config/env.config';

type UserJWTPayload = { _id: string; name: string; email: string };

export interface AuthRequest extends Request {
  user?: UserJWTPayload;
}

export function authGuard(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer '))
    return res.status(401).json({
      message: 'No token provided or invalid Authorization Header 💥',
    });

  const token = header.slice(7);
  try {
    const payload = jwt.verify(token, ENV.JWT_SECRET) as UserJWTPayload;
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token 💥' });
  }
}
