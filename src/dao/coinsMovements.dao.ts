import { Between, Repository } from "typeorm";
import { getConnection } from "../db";
import { BaseError } from "../utils/errors/error";
import { StatusCodes } from "http-status-codes";
import { CoinsMovementsRepository } from "../domain/repositories/coinsMovements.repository";
import { CoinsMovementsEntity } from "../models/coinsMovements.model";
import { CoinsMovements } from "../domain/coinsMovements";

export class CoinsMovementsDAO implements CoinsMovementsRepository {
  repository: Repository<CoinsMovementsEntity>;

  constructor() {
    getConnection().then((connection) => {
      this.repository = connection.getRepository(CoinsMovementsEntity);
    });
  }
    
  async create(item: CoinsMovements): Promise<CoinsMovements> {
    return (await this.repository.save(item)) as CoinsMovements;
  }
  async read(id: string): Promise<CoinsMovements> {
    return (await this.repository.findOneBy({ id: id })) as CoinsMovements;
  }
  async update(id: string, item: CoinsMovements): Promise<CoinsMovements> {
    const existingCoinsMovements = await this.repository.findOneBy({ id: id });
    if (item === null || Object.keys(item).length === 0) {
      throw new BaseError(
        "No se proporcionó un objeto para actualizar.",
        StatusCodes.BAD_REQUEST
      );
    }
    const updateCoinsMovements = Object.assign({}, existingCoinsMovements, item);
    return (await this.repository.save(updateCoinsMovements)) as CoinsMovements;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete({ id: id });
    return result.affected ? true : false;
  }

  search: (query?: string | undefined) => Promise<CoinsMovements[]>;

  async searchDate(query?: Date): Promise<CoinsMovements[]> {
    if (!query) {
      return (await this.repository.find()) as CoinsMovements[];
    }

    const startDate = new Date(query.getFullYear(),query.getMonth(),query.getDate(),0,0,0);
    const endDate = new Date(query.getFullYear(),query.getMonth(),query.getDate(),23,59,59);

    return (await this.repository.find({where: { createdAt: Between(startDate, endDate) }})) as CoinsMovements[];
  }
  
}