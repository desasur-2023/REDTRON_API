import { Repository } from "typeorm";
import { getConnection } from "../db";
import { SettleAcountRepository } from "../domain/repositories/settleAcount.repository";
import { SettleAcountEntity } from "../models/settleAcount.model";
import { SettleAcount } from "../domain/settleAcount";
import { BaseError } from "../utils/errors/error";
import { StatusCodes } from "http-status-codes";

export class SettleAcountDAO implements SettleAcountRepository {

    repository: Repository<SettleAcountEntity>;
    
    constructor() {
        getConnection().then((connection) => {
          this.repository = connection.getRepository(SettleAcountEntity);
        });
      }
    async create(item: SettleAcount): Promise<SettleAcount> {
        return (await this.repository.save(item)) as SettleAcount;
    }
    async read(id: string): Promise<SettleAcount> {
        return (await this.repository.findOneBy({ id: id })) as SettleAcount;
    }
    async update(id: string, item: SettleAcount): Promise<SettleAcount> {
        const existingSettleAcount = await this.repository.findOneBy({ id: id });
    if (item === null || Object.keys(item).length === 0) {
      throw new BaseError(
        "No se proporcionó un objeto para actualizar.",
        StatusCodes.BAD_REQUEST
      );
    }
    const updatedSettleAcount = Object.assign({}, existingSettleAcount, item);
    return (await this.repository.save(updatedSettleAcount)) as SettleAcount;
    }
    delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    search: (query?: string | undefined) => Promise<SettleAcount[]>;
    searchDate: (query?: Date | undefined) => Promise<SettleAcount[]>;
}