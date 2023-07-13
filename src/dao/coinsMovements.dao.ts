import { And, Between, Repository } from "typeorm";
import { getConnection } from "../db";
import { BaseError } from "../utils/errors/error";
import { StatusCodes } from "http-status-codes";
import { CoinsMovementsRepository } from "../domain/repositories/coinsMovements.repository";
import { CoinsMovementsEntity } from "../models/coinsMovements.model";
import { CoinsMovements } from "../domain/coinsMovements";
import { User } from "../domain/user";

export class CoinsMovementsDAO implements CoinsMovementsRepository {
  repository: Repository<CoinsMovementsEntity>;
  user: User;
  userCasinoId: string;
  inflow_qty: number;
  coins_balance: number;
  outflow_qty: number;

  constructor() {
    getConnection().then((connection) => {
      this.repository = connection.getRepository(CoinsMovementsEntity);
    });
  }
  createInflow(coinsMovement: CoinsMovements): Promise<CoinsMovements> {
    throw new Error("Method not implemented.");
  }
  create(item: CoinsMovements): Promise<CoinsMovements> {
    throw new Error("Method not implemented.");
  }

  async createCoinsFlow(coinsMovement: CoinsMovements): Promise<CoinsMovements> {
    const newCoinsMovement = await this.repository.save(coinsMovement);
    const result = await this.repository
      .createQueryBuilder("coinsMovements")
      .leftJoinAndSelect("coinsMovements.user", "user")
      .leftJoinAndSelect("coinsMovements.userCasinoId", "user_casino")
      .where("coinsMovements.id = :id", { id: newCoinsMovement.id })
      .select([
        "coinsMovements",
        "user.id",
        "user.username",
        "user.email",
        "user.role",
        "user_casino.id",
      ])
      .getOne();
    return result as CoinsMovements;
  }
  async read(id: string): Promise<CoinsMovements> {
    return (await this.repository.findOneBy({ id: id })) as CoinsMovements;
  }
  async update(id: string, item: CoinsMovements): Promise<CoinsMovements> {
    const existingCoinsMovements = await this.repository.findOneBy({ id: id });
    if(!existingCoinsMovements) throw new BaseError('No se encuentra el Coins Movement', StatusCodes.NOT_FOUND);    
    if (item === null || Object.keys(item).length === 0) throw new BaseError( "No se proporcionó un objeto para actualizar.", StatusCodes.BAD_REQUEST);
  
    const prevCoinsMovements = new CoinsMovementsEntity();
    prevCoinsMovements.id = existingCoinsMovements.id; 
    prevCoinsMovements.user = existingCoinsMovements.user;
    prevCoinsMovements.userCasinoId = existingCoinsMovements.userCasinoId
    prevCoinsMovements.historic = existingCoinsMovements.historic;
    prevCoinsMovements.inflow_qty = existingCoinsMovements.inflow_qty;
    prevCoinsMovements.outflow_qty = existingCoinsMovements.outflow_qty;
    prevCoinsMovements.coins_balance = Math.floor(existingCoinsMovements.coins_balance) - existingCoinsMovements.inflow_qty + Math.floor(item.inflow_qty)
    
    const updatedCoinsMovements = Object.assign({}, prevCoinsMovements, item);
    return (await this.repository.save(updatedCoinsMovements)) as CoinsMovements;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete({ id: id });
    return result.affected ? true : false;
  }

  async findLastInputByUserCasinoId(userCasinoId: string): Promise<CoinsMovements | null> {
    const lastInput = await this.repository.findOne({
      where: {
        userCasinoId: {
          id: userCasinoId
        }
      },
      order: { createdAt: 'DESC' }
    });

    //if (!lastInput) throw new BaseError('No se encuentra el Movimiento de Fichas', StatusCodes.NOT_FOUND);
    return lastInput  as CoinsMovementsEntity;
  }

  async search(userId?: string, casinoId?: string): Promise<CoinsMovements[]> {
    
      const query = this.repository
        .createQueryBuilder("coinsMovements")
        .leftJoinAndSelect("coinsMovements.user", "user")
        .leftJoinAndSelect("coinsMovements.userCasinoId", "user_casino")
        .leftJoinAndSelect("user_casino.casino", "casino")
        .leftJoinAndSelect("user_casino.user", "user_casino_user")
        .select([
          "coinsMovements",
          "user.id",
          "user.username",
          "user.email",
          "user.role",
          "user_casino.id",
          "casino.id",
          "casino.name",
          "user_casino_user.id",
          "user_casino_user.username"
        ]);
      
    if(userId) query.andWhere("user_casino_user.id = :userId", { userId })
    if(casinoId) query.andWhere("casino.id = :casinoId", {casinoId})
    
    query.orderBy("coinsMovements.createdAt", "DESC");

    return await query.getMany();
    

    // if (user) {
    //   const searchCoinsMovements = await this.repository.find({
    //     where: {
    //       user: {
    //         id: user,
    //       },
    //     },
    //     order: { createdAt: 'DESC' },
    //   });
    //   return coinsMovements(searchCoinsMovements)
    // }

    // if (userCasinoId) {
    //   const searchCoinsMovements = await this.repository.find({
    //     where: {
    //       userCasinoId: {
    //         id: userCasinoId,
    //       },
    //     },
    //     order: { createdAt: 'DESC' },
    //   });
    //   return coinsMovements(searchCoinsMovements)
    // }
    // const searchCoinsMovements = await this.repository.find();
    // return coinsMovements(searchCoinsMovements)
  }

  async searchDate(query?: Date): Promise<CoinsMovements[]> {
    if (!query) {
      return (await this.repository.find()) as CoinsMovements[];
    }

    const startDate = new Date(query.getFullYear(), query.getMonth(), query.getDate(), 0, 0, 0);
    const endDate = new Date(query.getFullYear(), query.getMonth(), query.getDate(), 23, 59, 59);

    return (await this.repository.find({ where: { createdAt: Between(startDate, endDate) } })) as CoinsMovements[];
  }

}