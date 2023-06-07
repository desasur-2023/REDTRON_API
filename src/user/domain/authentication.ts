import { UserRole } from "./user.entity";


export interface TokenPayload {
  userId: string;
  role: UserRole;
}
