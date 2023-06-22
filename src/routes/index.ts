import { Router } from "express";
import usersRouter from "./user.routes";
import casinoRouter from "./casino.routes";
import authRouter from "./auth.routes"
import { authorize } from "../middlewares/auth.middleware";
const router = Router();

//Solo log in podra iniciarse sin autorizacion (sin token)
router.use("/auth", authRouter());

//Antes del resto de las rutas se debe pasar por authorize
router.use(authorize);

//Resto de las rutas autorizadas
router.use("/users",usersRouter());
router.use("/casino", casinoRouter());

export default router;