import { NextFunction, Request, Response } from "express";
import { response } from "../utils/utils";
import controller from "../controllers/coinsMovements.controller";
import { BaseError } from "../utils/errors/error";
import { StatusCodes } from "http-status-codes";

const createCoinsInflow = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.id;
  const { userCasinoId, inflow_qty } = req.body;
  return response(res, StatusCodes.OK, await controller.createCoinsInflow({ userId, userCasinoId, inflow_qty: +inflow_qty }));
};

const createCoinsOutflow = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.id;
  const { userCasinoId, outflow_qty } = req.body;
  return response(res, StatusCodes.OK, await controller.createCoinsOutflow({ userId, userCasinoId, outflow_qty: +outflow_qty }));
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  const {userId, casinoId } = req.query
  // agregar busquedas por rangos de montos
  return response(res, StatusCodes.OK,await controller.getAll(userId as string, casinoId as string));
}

const getByDate = async (req: Request, res: Response, next: NextFunction) => {
  const { date } = req.query
  // agregar busquedas por rangos de montos
  return response(res, StatusCodes.OK,await controller.getByDate(date));
}

const findOneById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  return response(res, StatusCodes.OK,await controller.findOneById(id));
}

const deleteCoinsMovement = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id as string;
  return response(res, StatusCodes.OK,await controller.deleteCoinsMovement(id));
}

const update = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id as string;
  const item = req.body;
  return response(res, StatusCodes.OK,await controller.update(id, item));
}


export default { createCoinsInflow, createCoinsOutflow, getAll, getByDate, findOneById, delete: deleteCoinsMovement, update }