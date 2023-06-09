import { NextFunction, Request, Response, Router } from 'express';
import controllers from '../controllers';


export default function usersRouter(): Router {
  return Router()

    .get('/:id', controllers.findOneById)
    .get("/", controllers.getAll)
    .post("/", controllers.create)

    // .get('/', async (req: Request, res: Response) => {
    //   const users = await service.search();
    //   res.status(200).json(users);
    // })
    // .patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
    //   const { id } = req.params;
    //   return await service.update(id, req.body);
      
    // })
    // .delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    //   const { id } = req.params;
    //   return await service.delete(id);
    // })
  
}
