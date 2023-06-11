import { UserDAO } from "../dao/user.dao";
import { BaseError } from "../utils/error";
import { StatusCodes } from "http-status-codes";
import { User } from "../domain/user";

const findOneById = async (id: string) => {
  const userDAO = await new UserDAO();
  return await userDAO.read(id).catch((error: Error) => new BaseError(error.message, StatusCodes.CONFLICT));

}

const getAll = async (name?:string) => {
  const userDAO = await new UserDAO();
  return await userDAO.search(name).catch((error: Error) => new BaseError(error.message, StatusCodes.CONFLICT));
}

const create = async (user: User) => {
  const userDAO = await new UserDAO();
  return await userDAO.create(user).catch((error: Error) => new BaseError(error.message, StatusCodes.CONFLICT));
}

const del = async (id:string) => {
  const userDAO = await new UserDAO();
  return await userDAO.delete(id).catch((error: Error) => new BaseError(error.message, StatusCodes.CONFLICT));
}

export default {findOneById, getAll, create, delete: del}