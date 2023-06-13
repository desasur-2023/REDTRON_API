import { UserDAO } from "../dao/user.dao";
import { BaseError } from "../utils/error";
import { StatusCodes } from "http-status-codes";
import { User } from "../domain/user";
import { UserEntity } from "../models/user.model";

const findOneById = async (id: string) => {
  const userDAO = await new UserDAO();
  return await userDAO
    .read(id)
    .catch(
      (error: Error) => new BaseError(error.message, StatusCodes.CONFLICT)
    );
};

const getAll = async (name?: string) => {
  const userDAO = await new UserDAO();
  return await userDAO
    .search(name)
    .catch(
      (error: Error) => new BaseError(error.message, StatusCodes.CONFLICT)
    );
};

const create = async (user: User) => {
  const userDAO = await new UserDAO();
  return await userDAO
    .create(user)
    .catch(
      (error: Error) => new BaseError(error.message, StatusCodes.CONFLICT)
    );
};

const del = async (id: string) => {
  const userDAO = await new UserDAO();
  return await userDAO
    .delete(id)
    .catch(
      (error: Error) => new BaseError(error.message, StatusCodes.CONFLICT)
    );
};

const loginUser = async (user: User) => {
  const userDAO = await new UserDAO();
  const userLogin = await userDAO
    .loginUser(user)
    .catch(
      (error: Error) => new BaseError(error.message, StatusCodes.CONFLICT)
    );
  if (userLogin instanceof UserEntity) {
    const result = {
      id: userLogin.id,
      username: userLogin.username,
      email: userLogin.email,
      phone: userLogin.phone,
      role: userLogin.role,
      status: userLogin.status,
      createdAt: userLogin.createdAt,
    };

    return result;
  }

  return userLogin;
};

export default { findOneById, getAll, create, delete: del, loginUser };
