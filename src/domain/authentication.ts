import { UserRole } from "./user";


export interface TokenPayload {
  userId: string;
  role: UserRole;
}
