import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { logger } from "../logger";
import { StatusCodes } from "http-status-codes";
import { TokenPayload, UserRole } from "../domain/user";
import { BaseError } from "../utils/errors/error";
import { response } from "../utils/utils";

export const authorize = (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
      return next();
    } else {
      const token = req.headers.authorization?.replace('Bearer ', '');
      if (token !== undefined) {
        jwt.verify(token, process.env.JWT_SECRET!, (_error, decoded) => {
          if (decoded !== undefined) {
            logger('auth').info(`Usuario autorizado: ${(decoded as any).userId}`);
            return next();
          } else {
            throw new BaseError('No autorizado - Sesion Expirada',StatusCodes.UNAUTHORIZED)
          }
        });
      } else throw new BaseError('No autorizado - Token inexistente',StatusCodes.UNAUTHORIZED);
    }
  };
  
//   export const requireRole = (...roles: UserRole[]) => function (req: Request, res: Response, next: NextFunction) {
//     if (req.method === 'OPTIONS') {
//       next();
//     } else {
//       const { role } = jwt.verify(
//         req.headers.authorization?.replace('Bearer ', '')!,
//         process.env.JWT_SECRET || ''
//       ) as TokenPayload;
  
//       if (roles.includes(role)) {
//         next();
//       } else { res.status(StatusCodes.FORBIDDEN).json({ message: 'Unauthorized - Not an admin' }); }
//     }
//   };
  