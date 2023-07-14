import { Router } from "express";
import usersRouter from "./user.routes";
import casinoRouter from "./casino.routes";
import authRouter from "./auth.routes"
import userCasinoRouter from "./userCasino.routes"
import { authorize } from "../middlewares/auth.middleware";
import coinsMovementsRouter from "./coinsMovements.routes";
import playerRouter from "./player.routes";
import fs from 'fs';
import path from 'path';
import {marked} from 'marked'

const router = Router();

const readmePath = path.join(__dirname, './../../README.md');
const readmeContent = fs.readFileSync(readmePath, 'utf-8');
const readmeHtml = marked(readmeContent, {mangle: false, headerIds: false});

router.get('/', (_, res) => {
    const htmlWithStyles = `<div style="background-color: black; color: white;">${readmeHtml}</div>`;
    res.send(htmlWithStyles);
  });
  
  


//Solo log in podra iniciarse sin autorizacion (sin token)
router.use("/auth", authRouter());


//Antes del resto de las rutas se debe pasar por authorize
// router.use(authorize);

//Resto de las rutas autorizadas
router.use("/users",usersRouter());
router.use("/casino", casinoRouter());
router.use("/userCasino", userCasinoRouter());
router.use("/coinsMovements", coinsMovementsRouter());
router.use("/players", playerRouter());


export default router;

