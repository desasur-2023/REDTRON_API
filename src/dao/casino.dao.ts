import { DataSource, EntityManager } from "typeorm";
import { getConnection } from "../db";

import { CasinoRepository } from "../domain/casino.repository";
import { CasinoEntity } from "../models/casino.model";
import {} from "../domain/casino"

export class CasinoDAO implements CasinoRepository{

    conn : DataSource
    entityManager: EntityManager;

    constructor(){
        getConnection().then(connection => {
            this.conn = connection;
        })
        this.entityManager = this.conn.createEntityManager()
    }

    async create(item: Casino): Promise<Casino | undefined> {
        return await this.entityManager.create(CasinoEntity, item) as Casino;
        throw new Error("Method not implemented.");
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
        return await this.entityManager.find(CasinoEntity) as Casino[]; 
    }
}