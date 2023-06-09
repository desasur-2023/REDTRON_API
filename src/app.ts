import express, {NextFunction, Request, Response} from 'express'


import { getConnection } from "./db";

import { UserRepository } from "./user/domain/repositories/user.repository";
import morgan from "morgan";

import { StatusCodes } from "http-status-codes";
import { BaseError } from "./utils/error";
import usersRouter from './user/routes/user.routes';


export async function createApp() : Promise<Express.Application> {
    const connection = await getConnection();

    const app = express();

    app.use(express.json())
    app.use(morgan("dev"))
    app.use((_, res: Response, next: NextFunction) => {
        res
          .header("Access-Control-Allow-Origin", "*")
          .header(
            "Access-Control-Allow-Methods",
            "GET, POST, PATCH, PUT, DELETE, OPTIONS"
          )
          .header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials"
          );
        next();
    })
      
    app.use("/users", usersRouter())
  
    
    app.get("/health", async (_, res: Response) => {
      const isDbConnected = connection.isInitialized;
      const health = {
        timestamp: new Date(),
        status: isDbConnected ? "healthy" : "warning",
        db: isDbConnected ? "connected" : "disconnected",
      };

      res.status(StatusCodes.OK).json(health);
    })
    
    app.use((_req: Request, _res: Response, next: NextFunction) => {
      next(new BaseError('Not found', StatusCodes.NOT_FOUND));
    });
  
    // Error handler middleware
    app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
      if (err instanceof BaseError) {
        res.status(err.statusCode).json({ error: err.message });
      } else {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
      }
    });

  return app;
}


