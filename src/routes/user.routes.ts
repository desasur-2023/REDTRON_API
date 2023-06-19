import { Router } from 'express';
import {userHandler as handler} from '../handlers';
import authMiddleware from '../middlewares';




export default function usersRouter(): Router {
  return Router()

    .get('/:id', handler.findOneById)
    .get("/",authMiddleware.authorize, handler.getAll)
    .post("/", handler.create)
    .post("/login",handler.logIn)
    .delete("/:id", handler.delete)
    .put("/:id", handler.update)
  
}
