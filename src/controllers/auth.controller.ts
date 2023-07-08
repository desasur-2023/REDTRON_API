import { StatusCodes } from "http-status-codes";
import { UserDAO } from "../dao/user.dao";
import { TokenPayload, User, UserLogin } from "../domain/user";
import { BaseError } from "../utils/errors/error";

import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

const logIn = async (userLogin: UserLogin) => {
    const userDAO = await new UserDAO();
    const result = await userDAO.findByUserName(userLogin.username) 
                  .catch((error: Error) => new BaseError(`El usuario ${userLogin.username} no esta registrado`, StatusCodes.NOT_FOUND, error.message));
  
    if (!result || result instanceof BaseError) throw result; 
  
    const isPasswordCorrect = await bcryptjs.compare(userLogin.password, result.password as string);
  
    if (!isPasswordCorrect) {
      throw new BaseError('Contraseña incorrecta', StatusCodes.FORBIDDEN);
    }
  
    result.token = generateToken(result);
  
    const userWithToken = await userDAO.update(result.id, result)
    userWithToken.password = '';
    return userWithToken;
  }

function generateToken(u: User): string {
    if (!process.env.JWT_SECRET) {
        throw new BaseError('Cannot generate token', StatusCodes.CONFLICT);
    }
    return jwt.sign(
        { userId: u.id, role: u.role } as TokenPayload,
        process.env.JWT_SECRET!,
        { expiresIn: '1h' }
    );
}

export default {logIn}