import { Between, Repository } from "typeorm";
import { LoadRepository } from "../domain/repositories/load.repository";
import { LoadEntity } from "../models/load.model";
import { getConnection } from "../db";
import { Load } from "../domain/load";
import { BaseError } from "../utils/errors/error";
import { StatusCodes } from "http-status-codes";

export class LoadDAO implements LoadRepository {
  repository: Repository<LoadEntity>;

  constructor() {
    getConnection().then((connection) => {
      this.repository = connection.getRepository(LoadEntity);
    });
  }
    
  async create(item: Load): Promise<Load> {
    return (await this.repository.save(item)) as Load;
  }
  async read(id: string): Promise<Load> {
    return (await this.repository.findOneBy({ id: id })) as Load;
  }
  async update(id: string, item: Load): Promise<Load> {
    const existingLoad = await this.repository.findOneBy({ id: id });
    if (item === null || Object.keys(item).length === 0) {
      throw new BaseError(
        "No se proporcionó un objeto para actualizar.",
        StatusCodes.BAD_REQUEST
      );
    }
    const updatedLoad = Object.assign({}, existingLoad, item);
    return (await this.repository.save(updatedLoad)) as Load;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete({ id: id });
    return result.affected ? true : false;
  }

  search: (query?: string | undefined) => Promise<Load[]>;

  async searchDate(query?: Date): Promise<Load[]> {
    if (!query) {
      return (await this.repository.find()) as Load[];
    }

    const startDate = new Date(query.getFullYear(),query.getMonth(),query.getDate(),0,0,0);
    const endDate = new Date(query.getFullYear(),query.getMonth(),query.getDate(),23,59,59);

    return (await this.repository.find({where: { time: Between(startDate, endDate) }})) as Load[];
  }
  
}
