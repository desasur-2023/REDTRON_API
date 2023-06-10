import { Request, Response } from "express";
import { UserDAO } from "../dao/user.dao";

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
  const userDAO = await new UserDAO();
  const result =  await userDAO.create(req.body);
  return res.status(200).json(result);
}
