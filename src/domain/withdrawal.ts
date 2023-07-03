import { Base } from "../utils/common";
import dotenv from "dotenv";

dotenv.config();

export interface Withdrawal extends Base {
    credits: number
    status: WithdrawalStatus
    trasfer_url: string
}

export enum WithdrawalStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED'
  }