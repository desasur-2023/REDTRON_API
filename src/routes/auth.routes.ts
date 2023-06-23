import { Router } from 'express';
import {authHandler as handler} from '../handlers';

export default function usersRouter(): Router {
  return Router()
    .post("/login",handler.logIn)
}