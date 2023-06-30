import { StatusCodes } from "http-status-codes";
import { UserDAO } from "../dao/user.dao";
import { UserCasinoDAO } from "../dao/userCasino.dao";
import { User_Casino } from "../domain/user_casino";
import { BaseError } from "../utils/errors/error";
import { CasinoDAO } from "../dao/casino.dao";
import { User_Casino_Entity } from "../models/user_casino.model";
import { isValidUUID } from "../utils/functions/comprobarUUID";
import { User } from "../domain/user";
import { Casino } from "../domain/casino";



const create  = async (userid: string, casinoId: string) => {
    const userCasinoDAO = await new UserCasinoDAO()

    if (!isValidUUID(casinoId)) {
        throw new BaseError('Invalid casinoId format', StatusCodes.BAD_REQUEST);
      }

    if (!isValidUUID(userid)) {
        throw new BaseError('Invalid userid format', StatusCodes.BAD_REQUEST);
      }
    
    const userDAO = await new UserDAO();
    const user =  await userDAO.read(userid).catch(error => new BaseError("Usuario inexistente", StatusCodes.CONFLICT, error.message));
    
    if(Object.keys(user).length === 0){
        throw new BaseError(`The id: '${userid}' does not belong to an existing casino.`, StatusCodes.CONFLICT);
    }

    const casinoDAO = await new CasinoDAO();
    const casino = await casinoDAO.read(casinoId).catch(error => new BaseError(`The id: '${casinoId}' does not belong to an existing casino.`, StatusCodes.CONFLICT, error.message));
   
    
    if(Object.keys(casino).length === 0){
        throw new BaseError(`The id: '${casino}' does not belong to an existing casino.`, StatusCodes.CONFLICT);
    }

    const userCasino = await new User_Casino_Entity();
    userCasino.user = userid as unknown as User
    userCasino.casino = casinoId as unknown as Casino

    const result =  await userCasinoDAO.create(userCasino).catch(error => new BaseError("No se pudo registrar el usuario", StatusCodes.CONFLICT));

   return result
}

export default { create };