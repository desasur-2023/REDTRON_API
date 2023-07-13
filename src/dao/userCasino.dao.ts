import { Repository } from "typeorm";
import { UserCasinoRepository } from "../domain/repositories/userCasino.repository";
import { User_Casino_Entity } from "../models/user_casino.model";
import { User_Casino } from "../domain/user_casino";
import { BaseError } from "../utils/errors/error";
import { getConnection } from "../db";
import { StatusCodes } from "http-status-codes";

export class UserCasinoDAO implements UserCasinoRepository {
  findOne(arg0: { id: string; }) {
    throw new Error("Method not implemented.");
  }
  repository: Repository<User_Casino_Entity>;

  constructor() {
    getConnection().then((connection) => {
      this.repository = connection.getRepository(User_Casino_Entity);
    });
  }
  async create(item: User_Casino): Promise<User_Casino> {
    const saveUserCasino = await this.repository.save(item);
    const userCasino = await this.repository
      .createQueryBuilder("user_casino")
      .leftJoinAndSelect("user_casino.user", "user")
      .leftJoinAndSelect("user_casino.casino", "casino")
      .where("user_casino.id = :id", { id: saveUserCasino.id })
      .select([
        "user_casino",
        "user.id",
        "user.username",
        "user.email",
        "casino.id",
        "casino.name"
      ])
      .getOne();
    return userCasino as User_Casino;
  }

  read(id: string): Promise<User_Casino> {
    throw new Error("Method not implemented.");
  }
  update(id: string, item: User_Casino): Promise<User_Casino> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  
  async search(userId?: string, casinoId?: string): Promise<User_Casino[]> {
    
  const queryBuilder  = this.repository
  .createQueryBuilder("user_casino")
  .leftJoinAndSelect("user_casino.user", "user")
  .leftJoinAndSelect("user_casino.casino", "casino")
  .select([
    "user_casino",
    "user.id",
    "user.username",
    "user.email",
    "casino.id",
    "casino.name"
  ])
  
  if (userId) {
    queryBuilder.andWhere("user.id = :userId", { userId });
  }

  if (casinoId) {
    queryBuilder.andWhere("casino.id = :casinoId", { casinoId });
  }

  const result = await queryBuilder.getMany();

  return result;
     
}

async findById(userCasinoId: string): Promise<User_Casino> {
  const userCasino =  await this.repository//.findOneBy({ id: userCasinoId });
  .createQueryBuilder("user_casino")
      .leftJoinAndSelect("user_casino.user", "user")
      .leftJoinAndSelect("user_casino.casino", "casino")
      .whereInIds(userCasinoId)
      .select([
        "user_casino",
        "user.id",
        "user.username",
        "user.email",
        "casino.id",
        "casino.name"
      ])
      .getOne();
  if(!userCasino) throw new BaseError('No se encuentra el userCasino', StatusCodes.NOT_FOUND);
  return {...userCasino} as User_Casino;
}

  searchDate: (query?: Date | undefined) => Promise<User_Casino[]>;
}
