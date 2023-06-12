import { DataSource, EntityManager, ILike, Repository } from "typeorm";
import { getConnection } from "../db";

import { CasinoRepository } from "../domain/repositories/casino.repository";
import { CasinoEntity } from "../models/casino.model";
import { Casino } from "../domain/casino"
import { BaseError } from "../utils/error";
import { StatusCodes } from "http-status-codes";

export class CasinoDAO implements CasinoRepository{

    repository: Repository<CasinoEntity>

    constructor(){
        getConnection().then(connection => {
            this.repository = connection.getRepository(CasinoEntity)
        })
    }

    async create(item: Casino): Promise<Casino | undefined> {
        return await this.repository.save(item) as Casino;
    }
    async read(id: string): Promise<Casino | undefined> {
        return await this.repository.findOneBy({id: id}) as Casino;
    }
    async update(id: string, item: Casino): Promise<Casino | undefined> {
        const existingCasino = await this.repository.findOneBy({ id: id });
        if (item === null|| Object.keys(item).length === 0) {
            throw new BaseError('No se proporcionó un objeto para actualizar.', StatusCodes.BAD_REQUEST);
          }
        const updatedCasino = Object.assign({},existingCasino, item);
        return await this.repository.save(updatedCasino) as Casino;
      }
    async delete(id: string): Promise<boolean> {
        const result =  await this.repository.delete({id: id});
        return result.affected ? true : false;
    }
    async search(query?: string | undefined): Promise<Casino[]>{
        if (!query) {
            return await this.repository.find() as Casino[];
          }
          return await this.repository.find({ where: { name: ILike(`%${query}%`) } }) as Casino[];
    }
}