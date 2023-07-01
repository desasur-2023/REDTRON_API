import { NextFunction, Request, Response } from "express";
import { response } from "../utils/utils";
import { StatusCodes } from "http-status-codes";
import controller from "../controllers/userCasino.controller";


const create = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.body.userId;
    const casinoId = req.body.casinoId;
    return response(res, StatusCodes.OK, await controller.create(userId, casinoId));
  };

  const getAll = async (req: Request, res: Response, next: NextFunction) => {
    const { user, casino} = req.query;
    return response(res, StatusCodes.OK, await controller.getAll(user as string, casino as string));
  };

  export default { create, getAll };