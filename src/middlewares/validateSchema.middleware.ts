import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Validator from 'jsonschema';

export const validateSchema = (schema) =>{
    
    return function (req: Request, res: Response, next: NextFunction)  {
      const validation = Validator.validate(req.body, schema);
      if (!validation.valid) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Invalid request body',
          errors: validation.errors.map((error) => error.stack),
        });
      }
      next();
    }
  }
  