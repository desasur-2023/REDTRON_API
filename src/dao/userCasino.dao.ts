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
    return { ...(await this.repository.save(item)) } as User_Casino;
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
    if (!user && !casino) {
      return (await this.repository.find()) as User_Casino[];
    }

    if (user && casino) {
      return await this.repository.find({
        where: {
          user: {
            id: user,
          },
          casino: {
            id: casino,
          },
        },
      });
    }

    if (user) {
      return await this.repository.find({
        where: {
          user: {
            id: user,
          },
        },
      });
    }

    return await this.repository.find({
      where: {
        casino: {
          id: casino,
        },
      },
    });
  }

  searchDate: (query?: Date | undefined) => Promise<User_Casino[]>;
}
