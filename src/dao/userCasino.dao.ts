import { Repository } from "typeorm";
import { UserCasinoRepository } from "../domain/repositories/userCasino.repository";
import { User_Casino_Entity } from "../models/user_casino.model";
import { User_Casino } from "../domain/user_casino";
import { getConnection } from "../db";

export class UserCasinoDAO implements UserCasinoRepository {
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
  
  async search(user?: string, casino?: string): Promise<User_Casino[]> {
    const userCasinos = async (searchUserCasino: User_Casino_Entity[]) => { 
      const result  = await this.repository
      .createQueryBuilder("user_casino")
      .leftJoinAndSelect("user_casino.user", "user")
      .leftJoinAndSelect("user_casino.casino", "casino")
      .whereInIds(searchUserCasino)
      .select([
        "user_casino",
        "user.id",
        "user.username",
        "casino.id",
        "casino.name"
      ])
      .getMany();
    return result;
  }
    
    if (!user && !casino) {
      const searchUserCasino = await this.repository.find();
       return userCasinos(searchUserCasino)
      }
  
    if (user && casino) {
      const searchUserCasino = await this.repository.find({
        where: {
          user: {
            id: user,
          },
          casino: {
            id: casino,
          },
        },
      });
      return userCasinos(searchUserCasino)
    }
  
    if (user) {
      const searchUserCasino = await this.repository.find({
        where: {
          user: {
            id: user,
          },
        },
      });
      return userCasinos(searchUserCasino)
    }
  
     const searchUserCasino = await this.repository.find({
      where: {
        casino: {
          id: casino,
        },
      },
    });
    return userCasinos(searchUserCasino)
  }

  searchDate: (query?: Date | undefined) => Promise<User_Casino[]>;
}
