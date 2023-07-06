import { Router } from 'express';
import {coinsMovementsHandler as handler} from '../handlers';


export default function coinsMovementsRouter(): Router {
  return Router()

    .get("/", handler.getAll)
    // .get("/:id", handler.findOneById)
    .post("/:id", handler.create)
    .delete("/:id", handler.delete)
    .put("/:id", handler.update)

  
}