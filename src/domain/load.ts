import { Base } from "../utils/common";
import dotenv from "dotenv";

dotenv.config();

export interface Load extends Base {
    debits: number
    status: LoadStatus
    time: Date
    trasfer_url: string
}

export enum LoadStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED'
  }