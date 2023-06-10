import { NextFunction, Request, Response, Router } from 'express';
import controllers from '../controllers';


export default function usersRouter(): Router {
  return Router()

    .get('/:id', controllers.findOneById)
    .get("/", controllers.getAll)
    .post("/", controllers.create)
    .delete("/:id", controllers.delete)
  
}
