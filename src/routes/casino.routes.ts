import { Router } from 'express';
import {casinoHandler as handler} from '../handlers';


export default function casinoRouter(): Router {
  return Router()

    .get("/", handler.getAll)
    .post("/", handler.create)

  
}