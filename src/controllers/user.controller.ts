import { UserDAO } from "../dao/user.dao";
import { BaseError } from "../utils/errors/error";
import { StatusCodes } from "http-status-codes";
import { ChangePassword, User, UserStatus } from "../domain/user";

import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import { sendEmail } from "../utils/email/sendEmail";
import bienvenida from "./../utils/email/bienvenida"
import modificacion from "../utils/email/modificacion";


dotenv.config();

const from = process.env.EMAIL

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

  if(user.password === undefined ) user.password = "Redtron2013"

  const cifrado = process.env.SALT 
    if (cifrado === undefined) {
      throw new BaseError("La variable de entorno SALT no está definida", StatusCodes.CONFLICT);
    }
    const saltRounds = parseInt(cifrado)
    const salt = await bcryptjs.genSalt(saltRounds);
    let password = 'Redtron2023';
    user.password ? password = user.password : user.password = password;
    user.password = await bcryptjs.hash(user.password, salt);

  const result =  await userDAO.create(user).catch(error => new BaseError("No se pudo registrar el usuario", StatusCodes.CONFLICT));
  if(result instanceof BaseError) throw result;
  else {
    result.password = '';
    const email = await sendEmail(from, 'Cajero creado con éxito', bienvenida, result, password)
    .catch(error => new BaseError("No se puede enviar el mail", StatusCodes.CONFLICT, error.message));
    if(email instanceof BaseError) throw email;
  }
  
  return result;
};

const del = async (id: string) => {
  const userDAO = await new UserDAO();
  const result =  await userDAO.delete(id).catch(error => new BaseError("No se puede borrar el usuario", StatusCodes.CONFLICT));
  if(result instanceof BaseError) throw result;
  return result;
};


const update = async (id: string, item: User) => {
  const userDao = await new UserDAO();
  const result = await userDao.update(id, item).catch((error: Error) => new BaseError("No se puede modificar el usuario", StatusCodes.CONFLICT, error.message));
  if(result instanceof BaseError) throw result;
  else {
    result.password = '';
    const email = await sendEmail(from, 'Cajero modificado con éxito', modificacion, result, item)
    .catch(error => new BaseError("No se puede enviar el mail", StatusCodes.CONFLICT, error.message));
    if(email instanceof BaseError) throw email;
  }
  return result;
}


const changePassword = async (userName: string, item: ChangePassword) => {
  const userDao = await new UserDAO();
  const user = await userDao.findByUserName(userName).catch((error: Error) => new BaseError(`El usuario: ${userName} no se encuentra registrado`, StatusCodes.CONFLICT, error.message));

  if (!user || user instanceof BaseError) throw user; 

  if (user.password === undefined) {
    throw new BaseError('Contraseña no encontrada para el usuario', StatusCodes.INTERNAL_SERVER_ERROR);
  }

  const isPasswordCorrect = await bcryptjs.compare(item.password, user.password);

  if (!isPasswordCorrect) {
    throw new BaseError('Contraseña incorrecta', StatusCodes.FORBIDDEN);
  }

  if(item.newPassword === item.comparePassword){
    const cifrado = process.env.SALT 
    if (cifrado === undefined) {
      throw new BaseError("La variable de entorno SALT no está definida", StatusCodes.CONFLICT);
    }
    const saltRounds = parseInt(cifrado)
    const salt = await bcryptjs.genSalt(saltRounds);
    const pass = await bcryptjs.hash(item.newPassword, salt)
   
    const changeUser: User ={
      ...user,
      password: pass,
      status: UserStatus.ACTIVE
    }
    userDao.update(user.id, changeUser)
    return true
  }
  throw new BaseError('Las contraseñas no coinciden', StatusCodes.FORBIDDEN);
}
  

export default { findOneById, getAll, create, delete: del, update, changePassword};
