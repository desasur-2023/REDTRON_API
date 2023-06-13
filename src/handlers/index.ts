import { catchedAsync } from "../utils/utils"
import casinoH from "./casino.handller"
import userH from "./user.handler"

export const casinoHandler =  {
                        getAll: catchedAsync(casinoH.getAll),
                        findOneById : catchedAsync(casinoH.findOneById), 
                        delete: catchedAsync(casinoH.delete),
                        create: catchedAsync(casinoH.create),
                        update: catchedAsync(casinoH.update)
                        };

export const userHandler =  {
                        getAll: catchedAsync(userH.getAll),
                        findOneById : catchedAsync(userH.findOneById), 
                        delete: catchedAsync(userH.delete),
                        signUp: catchedAsync(userH.signUp),
                        update: catchedAsync(userH.update),
                        logIn: catchedAsync(userH.logIn)
                        };