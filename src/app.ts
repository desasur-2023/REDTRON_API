import express, {NextFunction, Request, Response} from 'express'


import { getConnection } from "./connectionManager";

import { UserRepository } from "./user/domain/repositories/user.repository";
import { UserDAO } from "./user/infrastructure/db/user.dao";
import morgan from "morgan";

import { StatusCodes } from "http-status-codes";
import { BaseError } from "./utils/error";
import { UserService } from "./user/application/services/user.service";
import usersRouter from "./user/application/routes/user.routes";


export async function createApp() : Promise<Express.Application> {
    const connection = await getConnection();
  
    // Repositories/DAOs
  
    const userRepo: UserRepository = new UserDAO();
  
    // Services
  
    const userService: UserService = new UserService(userRepo);
  
    
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
      
    app.use("/users", usersRouter(userService))
  
    app.get("/", (_, res: Response) => {
      res.send("Hello World!");
    })
      
    app.get("/test", (_, res: Response) => {
      res.send("deploy OK!");
    })
    
    app.get("/health", async (_, res: Response) => {
      const isDbConnected = connection.isInitialized;
      const health = {
        timestamp: new Date(),
        status: isDbConnected ? "healthy" : "warning",
        db: isDbConnected ? "connected" : "disconnected",
      };

      res.status(StatusCodes.OK).json(health);
    })
    
    app.use((error: BaseError, _req: Request, res: Response) => {
      res.status(error.code).send({ message: error.message });
    });

  return app;
}


