import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import Validator from "jsonschema";

import { BaseError, isAnError } from "../../../utils/error";
import { signUpSchema } from "../schemas/signup.schema";
import { loginSchema } from "../schemas/login.schema";
import { AuthenticationService } from "../services/authentication.service";

export default function authenticationRouter(
  service: AuthenticationService
): Router {
  return Router()
    .post(
      "/signup",
      async (req: Request, res: Response, next: NextFunction) => {
        const validation = Validator.validate(req.body, signUpSchema);
        if (!validation.valid) {
          res.status(StatusCodes.BAD_REQUEST).json({
            message: "Invalid request body",
            errors: validation.errors.map((error) => error.stack),
          });
        } else {
          const result = await service
            .signup(req.body)
            .catch((error: BaseError) => error);
          if (isAnError(result)) {
            next(result);
            return;
          }
          res.status(StatusCodes.OK).json(result);
        }
      }
    )
    .post("/login", async (req: Request, res: Response, next) => {
      const validation = Validator.validate(req.body, loginSchema);
      if (!validation.valid) {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: "Invalid request body",
          errors: validation.errors.map((error) => error.stack),
        });
      } else {
        const { email, password } = req.body;
        const result = await service
          .login(email, password)
          .catch((error: Error) => error);
        if (isAnError(result)) {
          next(result);
          return;
        }
        res.status(StatusCodes.OK).json(result);
      }
    })

    
}
