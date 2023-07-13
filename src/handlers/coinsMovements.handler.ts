import { NextFunction, Request, Response } from "express";
import { response } from "../utils/utils";
import controller from "../controllers/coinsMovements.controller";
import { BaseError } from "../utils/errors/error";
import { StatusCodes } from "http-status-codes";

const createCoinsInflow = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.id;
  const { userCasinoId, inflow_qty } = req.body;
  return response(res, StatusCodes.OK, await controller.createCoinsInflow({ userId, userCasinoId, inflow_qty }));
};

const createCoinsOutflow = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.id;
  const { userCasinoId, outflow_qty } = req.body;
  return response(res, StatusCodes.OK, await controller.createCoinsOutflow({ userId, userCasinoId, outflow_qty }));
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.query.user as string;
  const userCasinoId = req.query.userCasinoId as string;
  const result = await controller.getAll(user, userCasinoId)
  return res.status(StatusCodes.OK).json(result);
}

const findOneById = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id as string;
  const casinoId = await controller.findOneById(id);
  if (casinoId instanceof BaseError) return next(casinoId);
  return res.status(StatusCodes.OK).json(casinoId);
}

const deleteCoinsMovement = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id as string;
  const coinsMovementDeleted = await controller.deleteCoinsMovement(id);
  if (coinsMovementDeleted instanceof BaseError) return next(coinsMovementDeleted);
  return res.status(StatusCodes.OK).json(coinsMovementDeleted);
}

const update = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id as string;
  const item = req.body;
  const updatedCoinsMovement = await controller.update(id, item);
  if (updatedCoinsMovement instanceof BaseError) return next(updatedCoinsMovement);
  return res.status(StatusCodes.OK).json(updatedCoinsMovement);
}


export default { createCoinsInflow, createCoinsOutflow, getAll, findOneById, delete: deleteCoinsMovement, update }