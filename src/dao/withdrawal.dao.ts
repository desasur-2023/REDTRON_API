import { Between, Repository } from "typeorm";
import { WithdrawalRepository } from "../domain/repositories/withdrawal.repository";
import { WithdrawalEntity } from "../models/withdrawal.model";
import { getConnection } from "../db";
import { Withdrawal } from "../domain/withdrawal";
import { BaseError } from "../utils/errors/error";
import { StatusCodes } from "http-status-codes";

export class WithdrawalDAO implements WithdrawalRepository {
  repository: Repository<WithdrawalEntity>;

  constructor() {
    getConnection().then((connection) => {
      this.repository = connection.getRepository(WithdrawalEntity);
    });
  }
    async create(item: Withdrawal): Promise<Withdrawal> {
        return (await this.repository.save(item)) as Withdrawal;
    }
    async read(id: string): Promise<Withdrawal> {
        return (await this.repository.findOneBy({ id: id })) as Withdrawal;
    }
    async update(id: string, item: Withdrawal): Promise<Withdrawal> {
        const existingPlayer = await this.repository.findOneBy({ id: id });
    if (item === null || Object.keys(item).length === 0) {
      throw new BaseError(
        "No se proporcionó un objeto para actualizar.",
        StatusCodes.BAD_REQUEST
      );
    }
    const updatedPlayer = Object.assign({}, existingPlayer, item);
    return (await this.repository.save(updatedPlayer)) as Withdrawal;
    }
    async delete(id: string): Promise<boolean> {
        const result = await this.repository.delete({ id: id });
        return result.affected ? true : false;
    }
    search: (query?: string | undefined) => Promise<Withdrawal[]>;
    
    async searchDate(query?: Date): Promise<Withdrawal[]> {
        if (!query) {
          return (await this.repository.find()) as Withdrawal[];
        }
    
        const startDate = new Date(query.getFullYear(),query.getMonth(),query.getDate(),0,0,0);
        const endDate = new Date(query.getFullYear(),query.getMonth(),query.getDate(),23,59,59);
    
        return (await this.repository.find({where: { time: Between(startDate, endDate) }})) as Withdrawal[];
      }
}
