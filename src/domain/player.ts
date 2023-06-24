import { Base } from "../utils/common";
import dotenv from "dotenv";

dotenv.config();

export interface Player extends Base {
    nickname: string
    debits_profits: number
    teller: string
  }