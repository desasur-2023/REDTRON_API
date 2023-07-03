import { Between, Repository } from "typeorm";
import { getConnection } from "../db";
import { BaseError } from "../utils/errors/error";
import { StatusCodes } from "http-status-codes";
import { HistoricEntity } from "../models/historic.model";
import { HistoricRepository } from "../domain/repositories/historic.repository";
import { Historic } from "../domain/historic";

export class HistoricDAO implements HistoricRepository {

    repository: Repository<HistoricEntity>

    constructor(){
        getConnection().then(connection => {
            this.repository = connection.getRepository(HistoricEntity)
        })
    }
    async create(item: Historic): Promise<Historic> {
        return await this.repository.save(item) as Historic;;
    }
    async read(id: string): Promise<Historic> {
        return (await this.repository.findOneBy({ id: id })) as Historic;
    }
    update(id: string, item: Historic): Promise<Historic> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    async searchDate(query?: Date): Promise<Historic[]> {
        if (!query) {
          return (await this.repository.find()) as Historic[];
        }
    
        const startDate = new Date(query.getFullYear(),query.getMonth(),query.getDate(),0,0,0);
        const endDate = new Date(query.getFullYear(),query.getMonth(),query.getDate(),23,59,59);
    
        return (await this.repository.find({where: { createdAt: Between(startDate, endDate) }})) as Historic[];
      }
    
    search: (query?: string | undefined) => Promise<Historic[]> 
}