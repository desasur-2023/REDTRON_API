import { Sequelize } from "sequelize";
require("dotenv").config();
import { loginUserModels } from "./models/User/index.models";


const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME_BD } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME_BD}`,
  { logging: false }
);

//Ejecuto los modelos:
//User:
loginUserModels(sequelize)

export {sequelize}