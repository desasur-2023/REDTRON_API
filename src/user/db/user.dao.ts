import { DataSource, EntityManager, Repository } from "typeorm";

import { UserRepository } from "../domain/repositories/user.repository";
import { User } from "../domain/user";
import { getConnection } from "../../db";
import { UserEntity } from "./models/user.model";


export class UserDAO implements UserRepository {
  private connection: DataSource;
  //repository: Repository<UserModel>;
  protected entityManager : EntityManager

  constructor() {
    getConnection().then((connection) => {
      this.connection = connection;
    });
    this.entityManager = this.connection.createEntityManager()
    //this.repository = this.connection.getRepository(UserModel);
  }

  async search(query?: string | undefined): Promise<User[]>{
    return await this.entityManager.find(UserEntity) as User[]
  }

  async create(item: User): Promise<User | undefined> {
    return await this.entityManager.create(UserEntity, item) as User;
  }

  async read(id: string): Promise<User | undefined> {
    return await this.entityManager.findOneBy(UserEntity, {id: id}) as User
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
