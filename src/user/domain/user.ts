import { BaseEntity } from "../../utils/common"


export interface User extends BaseEntity {
  username: string
  phone: string
  email?: string
  role: UserRole
  status: UserStatus
  password: string
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
