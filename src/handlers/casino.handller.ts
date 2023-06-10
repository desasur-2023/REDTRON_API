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

export default {create, getAll}