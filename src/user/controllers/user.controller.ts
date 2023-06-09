import { Request, Response } from "express";
import { UserDAO } from "../db/user.dao";


// export class UserService {
//   constructor(
//     private repository: UserRepository
//   ) {}

//   async read(id: string): Promise<User | undefined> {
//     return this.repository.read(id);
//   }

//   async update(id: string, item: User): Promise<boolean> {
//     if (await this.repository.read(id)) {
//       return this.repository.update(id, item);
//     }
//     throw new BaseError('User not found', 404);
//   }

//   async delete(id: string): Promise<boolean> {
//     return this.repository.delete(id);
//   }

//   async search(query?: string): Promise<User[]> {
//     return (await this.repository.search(query)).map((user) => {
//       user.password = '';
//       return user;
//     });
//   }

// }

export const findOneById = async (req: Request, res: Response) => {
  const userDAO = new UserDAO();
  const { id } = req.params;
  return await userDAO.read(id);
}

export const getAll = async (req: Request, res: Response) => {
  const userDAO = new UserDAO();
  return  await userDAO.search();
}

export const create = async (req: Request, res: Response) => {
  const userDAO = new UserDAO();
  return  await userDAO.create(req.body);
}
