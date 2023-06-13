import { UserDAO } from "../dao/user.dao";
import { BaseError } from "../utils/errors/error";
import { StatusCodes } from "http-status-codes";
import { User, UserLogin } from "../domain/user";


import bcryptjs from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const findOneById = async (id: string) => {
  const userDAO = await new UserDAO();
  const result =  await userDAO.read(id).catch(error => new BaseError("Usuario inexistente", StatusCodes.CONFLICT, error.message));
  if(result instanceof BaseError) throw result;
  result.password = '';
  return result;
};

const getAll = async (name?: string) => {
  const userDAO = await new UserDAO();
  const result =  await userDAO.search(name).catch(error => new BaseError("No se pueden leer los usuarios", StatusCodes.CONFLICT, error.message));
  if(result instanceof BaseError) throw result;

  result.map(user => {
    user.password= "";
    return user;
    }) as User[];

  return result;
};

const create = async (user: User) => {
  const userDAO = await new UserDAO();

  const cifrado = process.env.SALT 
    if (cifrado === undefined) {
      throw new BaseError("La variable de entorno SALT no está definida", StatusCodes.CONFLICT);
    }
    const saltRounds = parseInt(cifrado)
    const salt = await bcryptjs.genSalt(saltRounds);
    user.password = await bcryptjs.hash(user.password, salt);

  const result =  await userDAO.create(user).catch(error => new BaseError("No se pudo registrar el usuario", StatusCodes.CONFLICT, error.message));
  if(result instanceof BaseError) throw result;
  return result;
};

const del = async (id: string) => {
  const userDAO = await new UserDAO();
  const result =  await userDAO.delete(id).catch(error => new BaseError("No se puede borrar el usuario", StatusCodes.CONFLICT, error.message));
  if(result instanceof BaseError) throw result;
  return result;
};

const logIn = async (userLogin: UserLogin) => {
  const userDAO = await new UserDAO();
  
  const result = await userDAO.findByUserName(userLogin.username) 
                .catch((error: Error) => new BaseError(`El usuario ${userLogin.username} no esta registrado`, StatusCodes.NOT_FOUND, error.message));

  if (!result || result instanceof BaseError) throw result; 
  
  const isPasswordCorrect = await bcryptjs.compare(userLogin.password, result.password);

  if (!isPasswordCorrect) {
    throw new BaseError('Contraseña incorrecta', StatusCodes.FORBIDDEN);
  }
  result.password = '';
  return result;
// retornar usuario con un token
}

const update = async (id: string, item: User) => {
  const userDao = await new UserDAO();
  const result = await userDao.update(id, item).catch((error: Error) => new BaseError("No se puede modificar el usuario", StatusCodes.CONFLICT, error.message));
  if(result instanceof BaseError) throw result;
  if(result) result.password = '';
  return result;
}

  

export default { findOneById, getAll, create, delete: del, logIn, update };
