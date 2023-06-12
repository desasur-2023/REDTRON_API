import { NextFunction, Request, Response } from "express";
import { BaseError } from "../utils/error";
import { StatusCodes } from "http-status-codes";
import controller from "../controllers/user.controller"
import { User } from "../domain/user";

const findOneById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const result =  await controller.findOneById(id)
  if(result instanceof BaseError) return next(result);
  return res.status(StatusCodes.OK).json(result);
}

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  const {username} = req.query;
  const result =  await controller.getAll(username as string)
  if(result instanceof BaseError) return next(result);
  return res.status(StatusCodes.OK).json(result);
}

const create = async (req: Request, res: Response, next: NextFunction) => {
  const result =  await controller.create(req.body as User);
  if(result instanceof BaseError) return next(result);
  return res.status(StatusCodes.OK).json(result);
}

const del = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const result =  await controller.delete(id);
  if(result instanceof BaseError) return next(result);
  return res.status(StatusCodes.OK).json(result);
}

export default {findOneById, getAll, create, delete: del}