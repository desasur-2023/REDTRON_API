import { NextFunction, Request, Response } from "express";
import { response } from "../utils/utils";
import { StatusCodes } from "http-status-codes";
import controller from "./../controllers/auth.controller"
import { UserLogin } from "../domain/user";

const logIn = async (req: Request, res: Response, next: NextFunction) => {
    const userLogin = req.body;
    return response(res, StatusCodes.OK, await controller.logIn({...userLogin} as UserLogin));
};

export default {logIn}