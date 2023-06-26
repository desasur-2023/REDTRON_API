import { Base } from "../utils/common";
import dotenv from "dotenv";
import { User_Casino } from "./user_casino";

dotenv.config();

export interface Player extends Base {
    nickname: string;
    debits_profits: number;
  }