import { Auth } from "./auth.interface";

export interface User extends Auth {
    email: string,
    phone: string
}


