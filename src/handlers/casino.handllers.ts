import { NextFunction, Request, Response } from "express";
import { crearCasinoController, getAllCasinoControllers } from "../controllers/casino.controller";
import { BaseError } from "../utils/error";
import { StatusCodes } from "http-status-codes";



export const create = async (req: Request, res: Response, next: NextFunction) => {
    const casino = req.body
    const result = await crearCasinoController(casino)
    if(result instanceof BaseError) return next(result);
    return res.status(StatusCodes.CREATED).json(result);
  }

  export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    const name = req.query.name as string;
    const result = await getAllCasinoControllers(name)
    if(result instanceof BaseError) return next(result);
    return res.status(StatusCodes.OK).json(result);
  }