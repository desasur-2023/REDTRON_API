import { Router } from "express";
import {playersHandler as handler} from '../handlers';

export default function playerRouter(): Router {
    return Router()
      .post("/", handler.create)
      .get("/", handler.get)
      .put("/:playerId", handler.update)
      .delete("/:playerId", handler.logicalDeletion)
  }