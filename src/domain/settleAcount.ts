import { Base } from "../utils/common";
import dotenv from "dotenv";

dotenv.config();

export interface SettleAcount extends Base {
    balance_due: number;
    status: SettleAcountStatus;
    start_period: Date;
    end_period: Date;
    transfer_url: string;
}

export enum SettleAcountStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED'
  }