import { Router } from 'express';
import {userCasinoHandler as handler} from '../handlers';

export default function usersRouter(): Router {
  return Router()
  
    .post("/", handler.create)
}