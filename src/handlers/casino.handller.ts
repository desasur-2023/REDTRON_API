import { NextFunction, Request, Response } from "express";
import controller from "../controllers/casino.controller";
import { BaseError } from "../utils/error";
import { StatusCodes } from "http-status-codes";
import { Casino } from "../domain/casino";

const create = async (req: Request, res: Response, next: NextFunction) => {
    const casino = req.body
    const result = await controller.create(casino as Casino)
    if(result instanceof BaseError) return next(result);
    return res.status(StatusCodes.CREATED).json(result);
  }

const getAll = async (req: Request, res: Response, next: NextFunction) => {
    const name = req.query.name as string;
    const result = await controller.getAll(name)
    if(result instanceof BaseError) return next(result);
    return res.status(StatusCodes.OK).json(result);
  }

const findOneById = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id as string;
  const casinoId = await controller.findOneById(id);
  if(casinoId instanceof BaseError) return next(casinoId);
  return res.status(StatusCodes.OK).json(casinoId);
}

const deleteCasino =async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id as string;
  const casinoDelet = await controller.deleteCasino(id);
  if(casinoDelet instanceof BaseError) return next(casinoDelet);
  return res.status(StatusCodes.OK).json(casinoDelet);
}


export default {create, getAll, findOneById, deleteCasino}