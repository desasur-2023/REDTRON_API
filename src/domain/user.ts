import { Base } from "../utils/common";
import dotenv from "dotenv";

dotenv.config();

export interface User extends Base {
  username: string
  phone: string
  email?: string
  role: UserRole
  status: UserStatus
  password: string,
  token: string
}

export enum UserRole {
  ADMIN = 'ADMIN',
  TELLER = 'TELLER',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DISABLED = 'DISABLED'
}

export interface UserLogin{
  username: string,
  password: string
}

export interface TokenPayload {
  userId: string;
  role: UserRole;
}

export const defaultValues = {
  password: 'Redtron2023',
  email: process.env.EMAIL,
}
