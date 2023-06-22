import { NextFunction, Request, Response } from "express";
import { BaseError } from "../utils/errors/error";
import { StatusCodes } from "http-status-codes";
import controller from "../controllers/user.controller";
import { User, UserLogin } from "../domain/user";
import { response } from "../utils/utils";
import { log } from "console";

const findOneById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  return response(res, StatusCodes.OK, await controller.findOneById(id));
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.query;
  return response(res, StatusCodes.OK, await controller.getAll(username as string));
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  return response(res, StatusCodes.OK, await controller.create(req.body as User));
};

const del = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  return response(res, StatusCodes.OK, await controller.delete(id));
};

const logIn = async (req: Request, res: Response, next: NextFunction) => {
  const userLogin = req.body;
  return response(res, StatusCodes.OK, await controller.logIn({...userLogin} as UserLogin));
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  return response(res, StatusCodes.OK, await controller.update(id, {...req.body} as User));
};
export default { findOneById, getAll, create, delete: del, logIn, update};
