import { Base } from "../utils/common";
import dotenv from "dotenv";

dotenv.config();

export interface SettleAcount extends Base {
    balance_due: number;
    status: SettleAcountStatus;
    period: {
        start: Date;
        end: Date;
      };
    time: Date;
    transfer_url: string;
}

export enum SettleAcountStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED'
  }