import { Router } from 'express';
import {userHandler as handler} from '../handlers';

export default function usersRouter(): Router {
  return Router()

    .get('/:id', handler.findOneById)
    .get("/", handler.getAll)
    .post("/", handler.create)
    //.post("/login",handler.logIn)
    .delete("/:id", handler.delete)
    .put("/changePassword", handler.changePassword)
    .put("/:id", handler.update)
  
}
