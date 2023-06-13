import { DataSource,  Repository} from "typeorm";
import { UserRepository } from "../domain/repositories/user.repository";
import { User } from "../domain/user";
import { UserEntity } from "../models/user.model";
import { getConnection } from "../db";
import { BaseError } from "../utils/error";
import { StatusCodes } from "http-status-codes";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import { log } from "console";

dotenv.config();

export class UserDAO implements UserRepository {
  
  repository: Repository<UserEntity>;
  

  constructor() {
    getConnection().then((connection) => {
      this.repository = connection.getRepository(UserEntity)
    })
    
  }

  async search(query?: string | undefined): Promise<User[]>{
    if (!query) {
      return await this.repository.find() as User[];
    }
    return await this.repository.find({ where: { username: query } }) as User[];
  }

  async create(item: User): Promise<User | undefined> {
    const cifrado = process.env.SALT 
    if (cifrado === undefined) {
      throw new Error("La variable de entorno SALT no está definida");
    }
    const saltRounds = parseInt(cifrado)
    const salt = await bcryptjs.genSalt(saltRounds);
    item.password = await bcryptjs.hash(item.password, salt);
    return await this.repository.save(item) as User;
  }

  async read(id: string): Promise<User | undefined> {
    return await this.repository.findOneBy({id: id}) as User
  }


  findByPhone(phone: string): Promise<User | undefined> {
    throw new Error("Method not implemented.");
  }

  findByUserName(userName: string): Promise<User | undefined> {
    throw new Error("Method not implemented.");
  }

  async update(id: string, item: User): Promise<User | undefined> {
    const user = await this.repository.findOneBy({id: id});
    if (item === null|| Object.keys(item).length === 0) {
      throw new BaseError('No se proporcionó un objeto para actualizar.', StatusCodes.BAD_REQUEST);
    }
    const updatedUser = Object.assign({},user, item);
    return await this.repository.save(updatedUser) as User;
  }

  async delete(id: string): Promise<boolean> {
    const result =  await this.repository.delete({id: id});
    return result.affected ? true : false;
  }

  async loginUser(user: User): Promise<User | undefined> {
    const userLogin = await this.repository.findOne({ where: { username: user.username } });
    
    if(!userLogin) throw new BaseError('El usuario no esta registrado', StatusCodes.BAD_REQUEST);
  
    if (userLogin) {
      const isPasswordCorrect = await bcryptjs.compare(user.password, userLogin.password);
  
      if (isPasswordCorrect) {
        return userLogin;
      }
    }
  
    throw new BaseError('Contraseña incorrecta', StatusCodes.BAD_REQUEST);
  }
  
}
