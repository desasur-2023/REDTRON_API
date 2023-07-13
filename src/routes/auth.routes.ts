import { Router } from 'express';
import {authHandler as handler} from '../handlers';
import { validateSchema } from '../middlewares/validateSchema.middleware';
import { loginSchema } from '../schemas/auth/auth-login';


export default function usersRouter(): Router {
  return Router()
    .post("/login",validateSchema(loginSchema), handler.logIn)
}