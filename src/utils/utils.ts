import crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';


export function randomToken() {

    return crypto.randomBytes(20).toString('hex');

}

export const response = (res, statusCode, data) => {
    return res.status(statusCode).json({
      error: false,
      data,
    });
};

export const catchedAsync = (fn) => {
    return function (req: Request, res: Response, next: NextFunction) {
      fn(req, res).catch((error) => next(error));
    };
  };
  