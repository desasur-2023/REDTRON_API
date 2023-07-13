import { Base } from "../utils/common";
import dotenv from "dotenv";

dotenv.config();

export interface User_Casino extends Base {
    user: any;
    status: User_CasinoStatus
    debits: number;
    credits: number;
}

export enum User_CasinoStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    DISABLED = 'DISABLED'
}