import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { response } from "../utils/utils";
import controller from "../controllers/player.controller";
import { Player } from "../domain/player";

const create = async (req: Request, res: Response, next: NextFunction) => {
    return response(res, StatusCodes.OK, await controller.create(req.body));
  };

const get = async (req: Request, res: Response, next: NextFunction) => {
  const { name, userCasinoId} = req.query;
  return response(res, StatusCodes.OK, await controller.get(name as string, userCasinoId as string));
}

  export default { create, get};