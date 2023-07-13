import { Base } from "../utils/common";
import dotenv from "dotenv";

dotenv.config();

export interface Player extends Base {
    nickname: string;
    status: PlayerStatus;
    debits_profits: number;
  }

  export enum PlayerStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    DISABLED = 'DISABLED'
  }