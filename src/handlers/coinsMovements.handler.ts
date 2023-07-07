import { NextFunction, Request, Response } from "express";
import { response } from "../utils/utils";
import controller from "../controllers/coinsMovements.controller";
import { BaseError } from "../utils/errors/error";
import { StatusCodes } from "http-status-codes";
import { Casino } from "../domain/casino";
import { CoinsMovements } from "../domain/coinsMovements";

const create = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const {userCasinoId, qty} = req.body;
    return response(res, StatusCodes.OK, await controller.createCoinsInflow({userId, userCasinoId, qty}));
  };

const getAll = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.query.user as string;
    const userCasinoId = req.query.userCasinoId as string;
    const result = await controller.getAll(user,userCasinoId)
    // if(result instanceof BaseError) return next(result);
    return res.status(StatusCodes.OK).json(result);
  }

const findOneById = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id as string;
  const casinoId = await controller.findOneById(id);
  if(casinoId instanceof BaseError) return next(casinoId);
  return res.status(StatusCodes.OK).json(casinoId);
}

const deleteCasino = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id as string;
  const casinoDelet = await controller.deleteCasino(id);
  if(casinoDelet instanceof BaseError) return next(casinoDelet);
  return res.status(StatusCodes.OK).json(casinoDelet);
}

const update = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id as string;
  const item = req.body;
  const updateCasino = await controller.update(id, item);
  if(updateCasino instanceof BaseError) return next(updateCasino);
  return res.status(StatusCodes.OK).json(updateCasino);
}


export default {create, getAll, findOneById, delete: deleteCasino, update}