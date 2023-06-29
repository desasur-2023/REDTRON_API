import { Between, Repository } from "typeorm";
import { getConnection } from "../db";
import { BaseError } from "../utils/errors/error";
import { StatusCodes } from "http-status-codes";
import { CoinsInflowRepository } from "../domain/repositories/coinsInflow.repository";
import { CoinsInflowEntity } from "../models/coinsInflow.model";
import { CoinsInflow } from "../domain/coinsInflow";

export class CoinsInflowDAO implements CoinsInflowRepository {
  repository: Repository<CoinsInflowEntity>;

  constructor() {
    getConnection().then((connection) => {
      this.repository = connection.getRepository(CoinsInflowEntity);
    });
  }
    
  async create(item: CoinsInflow): Promise<CoinsInflow> {
    return (await this.repository.save(item)) as CoinsInflow;
  }
  async read(id: string): Promise<CoinsInflow> {
    return (await this.repository.findOneBy({ id: id })) as CoinsInflow;
  }
  async update(id: string, item: CoinsInflow): Promise<CoinsInflow> {
    const existingCoinsInflow = await this.repository.findOneBy({ id: id });
    if (item === null || Object.keys(item).length === 0) {
      throw new BaseError(
        "No se proporcionó un objeto para actualizar.",
        StatusCodes.BAD_REQUEST
      );
    }
    const updateCoinsInflow = Object.assign({}, existingCoinsInflow, item);
    return (await this.repository.save(updateCoinsInflow)) as CoinsInflow;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete({ id: id });
    return result.affected ? true : false;
  }

  search: (query?: string | undefined) => Promise<CoinsInflow[]>;

  async searchDate(query?: Date): Promise<CoinsInflow[]> {
    if (!query) {
      return (await this.repository.find()) as CoinsInflow[];
    }

    const startDate = new Date(query.getFullYear(),query.getMonth(),query.getDate(),0,0,0);
    const endDate = new Date(query.getFullYear(),query.getMonth(),query.getDate(),23,59,59);

    return (await this.repository.find({where: { createdAt: Between(startDate, endDate) }})) as CoinsInflow[];
  }
  
}