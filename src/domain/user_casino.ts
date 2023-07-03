import { Base } from "../utils/common";
import dotenv from "dotenv";
import { Casino } from "./casino";
import { User } from "./user";

dotenv.config();

export interface User_Casino extends Base {
    debits: number;
    credits: number;
}