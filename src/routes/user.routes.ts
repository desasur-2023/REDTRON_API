import { Router } from 'express';
import {userHandler as handler} from '../handlers';

import { validateSchema } from '../middlewares/validateSchema.middleware';
import { userSchema } from '../schemas/users/user-create';


export default function usersRouter(): Router {
  return Router()

    .get('/:id', handler.findOneById)
    .get("/", handler.getAll)
    .post("/",validateSchema(userSchema), handler.create)
    .delete("/:id", handler.delete)
    .put("/changePassword", handler.changePassword)
    .put("/:id", handler.update)
  
}
