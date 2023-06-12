import { DataSource,  Repository} from "typeorm";
import { UserRepository } from "../domain/repositories/user.repository";
import { User } from "../domain/user";
import { UserEntity } from "../models/user.model";
import { getConnection } from "../db";


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

  update(id: string, item: User): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<boolean> {
    const result =  await this.repository.delete({id: id});
    return result.affected ? true : false;
  }
}
