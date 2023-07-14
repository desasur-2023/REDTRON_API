import { Base } from "../utils/common";
import dotenv from "dotenv";

dotenv.config();

export interface Player extends Base {
    nickname: string;
    status: PlayerStatus;
  }

  export enum PlayerStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    DISABLED = 'DISABLED'
  }