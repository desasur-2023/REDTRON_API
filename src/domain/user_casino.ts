import { Base } from "../utils/common";
import dotenv from "dotenv";
import { Casino } from "./casino";
import { User } from "./user";

dotenv.config();

export interface User_Casino extends Base {
    status: User_CasinoStatus
    debits: number;
    credits: number;
}

export enum User_CasinoStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    DISABLED = 'DISABLED'
  }