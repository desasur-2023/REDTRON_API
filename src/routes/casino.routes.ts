import { Router } from 'express';
import {casinoHandler as handler} from '../handlers';


export default function casinoRouter(): Router {
  return Router()

    .get("/", handler.getAll)
    .get("/:id", handler.findOneById)
    .post("/", handler.create)
    .delete("/:id", handler.delete)
    .put("/:id", handler.update)

  
}