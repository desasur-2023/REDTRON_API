import { Base } from "../utils/common"

export interface User extends Base {
  username: string
  phone: string
  email?: string
  role: UserRole
  status: UserStatus
  password?: string,
  percent_agreement: number,
  total_balance: number,
  last_settle_date: Date,
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


export enum DefaultValues {
  PASSWORD = 'REDTRON1234',
  EMAIL = 'hugoschierano@gmail.com',

}

export interface ChangePassword {
  password: string,
  newPassword: string,
  comparePassword: string
}