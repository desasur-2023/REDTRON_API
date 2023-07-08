import { NextFunction, Request, Response } from "express";
import { response } from "../utils/utils";
import { StatusCodes } from "http-status-codes";
import controller from "../controllers/userCasino.controller";


const create = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  
    const userId = req.body.userId;
    const casinoId = req.body.casinoId;
    return response(res, StatusCodes.OK, await controller.create(userId, casinoId));
  };

  const getAll = async (req: Request, res: Response, next: NextFunction) => {
    const { userId, casinoId} = req.query;
    return response(res, StatusCodes.OK, await controller.getAll(userId as string, casinoId as string));
  };

  export default { create, getAll };