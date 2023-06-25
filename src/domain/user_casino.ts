import { Base } from "../utils/common";
import dotenv from "dotenv";

dotenv.config();

export interface User_Casino extends Base {
    debits: number;
    credits: number;
    time: Date;
}