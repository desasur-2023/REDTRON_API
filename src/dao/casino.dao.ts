import { DataSource, EntityManager, ILike, Repository } from "typeorm";
import { getConnection } from "../db";

import { CasinoRepository } from "../domain/repositories/casino.repository";
import { CasinoEntity } from "../models/casino.model";
import { Casino } from "../domain/casino"

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
    read(id: string): Promise<Casino | undefined> {
        throw new Error("Method not implemented.");
    }
    update(id: string, item: Casino): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    async search(query?: string | undefined): Promise<Casino[]>{
        if (!query) {
            return await this.repository.find() as Casino[];
          }
          return await this.repository.find({ where: { name: ILike(`%${query}%`) } }) as Casino[];
    }
}