import { Router } from 'express';
import {coinsMovementsHandler as handler} from '../handlers';


export default function coinsMovementsRouter(): Router {
  return Router()

    .get("/", handler.getAll)
    .post("/coinsInflow/:id", handler.createCoinsInflow)
    .post("/coinsOutflow/:id", handler.createCoinsOutflow)
    .delete("/:id", handler.delete)
    .put("/:id", handler.update)
}