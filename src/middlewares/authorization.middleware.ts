import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { logger } from '../../logger';
import { UserRole } from '../domain/user';
import { TokenPayload } from '../domain/authentication';


export const authorize = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    next();
  } else {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (token !== undefined) {
      jwt.verify(token, process.env.JWT_SECRET!, (_error, decoded) => {
        if (decoded !== undefined) {
          logger('auth').info(`Authorizing user: ${(decoded as any).userId}`);
          next();
        } else {
          res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ message: 'Unauthorized - Expired-session' });
        }
      });
    } else res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized - Missing token' });
  }
};

export const requireRole = (...roles: UserRole[]) => function (req: Request, res: Response, next: NextFunction) {
  if (req.method === 'OPTIONS') {
    next();
  } else {
    const { role } = jwt.verify(
      req.headers.authorization?.replace('Bearer ', '')!,
      process.env.JWT_SECRET || ''
    ) as TokenPayload;

    if (roles.includes(role)) {
      next();
    } else { res.status(StatusCodes.FORBIDDEN).json({ message: 'Unauthorized - Not an admin' }); }
  }
};
