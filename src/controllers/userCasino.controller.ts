import { StatusCodes } from "http-status-codes";
import { UserDAO } from "../dao/user.dao";
import { UserCasinoDAO } from "../dao/userCasino.dao";
import { BaseError } from "../utils/errors/error";
import { CasinoDAO } from "../dao/casino.dao";
import { User_Casino_Entity } from "../models/user_casino.model";
import { isValidUUID } from "../utils/functions/comprobarUUID";
import { User } from "../domain/user";
import { Casino } from "../domain/casino";



const create = async (userId: string, casinoId: string) => {

  if(!isValidUUID(casinoId)) throw new BaseError('Invalid casinoId format', StatusCodes.BAD_REQUEST);
  
  if(!isValidUUID(userId)) throw new BaseError('Invalid userid format', StatusCodes.BAD_REQUEST);

  const userCasinoDAO = await new UserCasinoDAO()

  const checkUserCasino = await userCasinoDAO.search(userId, casinoId).catch(error => new BaseError('The ids does not belong to an existing user or casino.', StatusCodes.CONFLICT, error.message));
  
  if(Object.keys(checkUserCasino).length !== 0) throw new BaseError('The user has already assigned to this casino', StatusCodes.CONFLICT);

  const userDAO = await new UserDAO();
  const user = await userDAO.read(userId).catch(error => new BaseError(`The id: '${userId}' does not belong to an existing user.`, StatusCodes.CONFLICT, error.message));

  if (Object.keys(user).length === 0) {
    throw new BaseError(`The id: '${userId}' does not belong to an existing user.`, StatusCodes.CONFLICT);
  }

  const casinoDAO = await new CasinoDAO();
  const casino = await casinoDAO.read(casinoId).catch(error => new BaseError(`The id: '${casinoId}' does not belong to an existing casino.`, StatusCodes.CONFLICT, error.message));

  if (Object.keys(casino).length === 0) {
    throw new BaseError(`The id: '${casino}' does not belong to an existing casino.`, StatusCodes.CONFLICT);
  }

  const userCasino = await new User_Casino_Entity();
  userCasino.user = userId as unknown as User
  userCasino.casino = casinoId as unknown as Casino
  userCasino.credits = 0
  userCasino.debits = 0

  const result = await userCasinoDAO.create(userCasino).catch(error => new BaseError("Failed to create the user_casino.", StatusCodes.CONFLICT));

  return result;
}

const getAll = async (user?: string, casino?: string) => {
  const userDAO = await new UserCasinoDAO();
  const result = await userDAO.search(user, casino).catch(error => new BaseError("No User_Casino found with those parameters", StatusCodes.CONFLICT, error.message));
  if (result instanceof BaseError) throw result;

  return result;
};

export default { create, getAll };