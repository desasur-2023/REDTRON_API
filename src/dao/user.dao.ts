import { DataSource, EntityManager} from "typeorm";
import { UserRepository } from "../domain/repositories/user.repository";
import { User } from "../domain/user";
import { UserEntity } from "../models/user.model";
import { getConnection } from "../db";


export class UserDAO implements UserRepository {
  private connection: DataSource;
  //repository: Repository<UserModel>;
  //protected entityManager : EntityManager

  constructor() {
    getConnection().then((connection) => {
      this.connection = connection;
    });
    
    //this.repository = this.connection.getRepository(UserModel);
  }

  async search(query?: string | undefined): Promise<User[]>{
    return await this.connection.createEntityManager().find(UserEntity) as User[]
  }

  async create(item: User): Promise<User | undefined> {
    console.log(item);
    const usersRepo = await this.connection.getRepository(UserEntity);

    const result = await usersRepo.save(item)
    console.log(result);
    return result as User;
  }

  async read(id: string): Promise<User | undefined> {
    return await this.connection.createEntityManager().findOneBy(UserEntity, {id: id}) as User
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

  delete(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
