import { NextFunction, Request, Response, Router } from 'express';
import { UserService } from '../services/user.service';






export default function usersRouter(service: UserService): Router {
  return Router()

    .get('/:id', async (req: Request, res: Response) => {
      const { id } = req.params;
      const users = await service.read(id);
      res.status(200).json(users);
    })

    .get('/', async (req: Request, res: Response) => {
      const users = await service.search();
      res.status(200).json(users);
    })
    .patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      return await service.update(id, req.body);
      
    })
    .delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      return await service.delete(id);
    })
   

}
