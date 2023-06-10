import { NextFunction, Request, Response } from "express";
import { UserDAO } from "../dao/user.dao";
import { BaseError } from "../utils/error";
import { StatusCodes } from "http-status-codes";

export const findOneById = async (req: Request, res: Response, next: NextFunction) => {
  const userDAO = await new UserDAO();
  const { id } = req.params;
  const result =  await userDAO.read(id).catch((error: Error) => new BaseError(error.message, StatusCodes.CONFLICT));
  if(result instanceof BaseError) return next(result);
  return res.status(StatusCodes.OK).json(result);
}

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  const userDAO = await new UserDAO();
  const result =  await userDAO.search().catch((error: Error) => new BaseError(error.message, StatusCodes.CONFLICT));
  if(result instanceof BaseError) return next(result);
  return res.status(StatusCodes.OK).json(result);
}

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const userDAO = await new UserDAO();
  const result =  await userDAO.create(req.body).catch((error: Error) => new BaseError(error.message, StatusCodes.CONFLICT));
  if(result instanceof BaseError) return next(result);
  return res.status(StatusCodes.OK).json(result);
}

export const del = async (req: Request, res: Response, next: NextFunction) => {
  const userDAO = await new UserDAO();
  const { id } = req.params;
  const result =  await userDAO.delete(id).catch((error: Error) => new BaseError(error.message, StatusCodes.CONFLICT));
  if(result instanceof BaseError) return next(result);
  return res.status(StatusCodes.OK).json(result);
}
