import { NextFunction, Request, Response } from "express";
import { response } from "../utils/utils";
import { StatusCodes } from "http-status-codes";
import controller from "../controllers/userCasino.controller";
import { User_Casino } from "../domain/user_casino";

const create = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.body.userId;
    const casinoId = req.body.casinoId;
    return response(res, StatusCodes.OK, await controller.create(userId, casinoId));
  };

  export default { create };