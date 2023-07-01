import { DataSource,  Repository} from "typeorm";
import { UserRepository } from "../domain/repositories/user.repository";
import { User } from "../domain/user";
import { UserEntity } from "../models/user.model";
import { getConnection } from "../db";
import { BaseError } from "../utils/errors/error";
import { StatusCodes } from "http-status-codes";


// dotenv.config();

export class UserDAO implements UserRepository {
  
  repository: Repository<UserEntity>;
  

  constructor() {
    getConnection().then((connection) => {
      this.repository = connection.getRepository(UserEntity)
    })
    
  }

  async search(query?: string): Promise<User[]>{
    if (!query) {
      return  await this.repository.find() as User[];
    }
    return await this.repository.find({ where: { username: query } });
  }

  async create(item: User): Promise<User> {
    return { ...await this.repository.save(item) } as User;
  }

  async read(id: string): Promise<User> {
    return { ...await this.repository.findOneBy({id: id}) } as User
  }


  findByPhone(phone: string): Promise<User> {
    throw new Error("Method not implemented.");
  }

  async findByUserName(userName: string): Promise<User> {
    const user =  await this.repository.findOne({ where: { username: userName } });
    if(!user) throw new BaseError('No se encuentra el usuario', StatusCodes.NOT_FOUND);
    return {...user} as User;
  }

  async update(id: string, item: User): Promise<User> {
    const user = await this.repository.findOneBy({id: id});
    if (item === null|| Object.keys(item).length === 0) {
      throw new BaseError('No se proporcionó un objeto para actualizar.', StatusCodes.BAD_REQUEST);
    }
    const updatedUser = Object.assign({},user, item);
    return {...await this.repository.save(updatedUser)} as User;
  }

  async delete(id: string): Promise<boolean> {
    const result =  await this.repository.delete({id: id});
    return result.affected ? true : false;
  }

  searchDate: (query?: Date | undefined) => Promise<User[]>;
  
}
