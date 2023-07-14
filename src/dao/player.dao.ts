import { ILike, Repository } from "typeorm";
import { Player } from "../domain/player";
import { PlayerRepository } from "../domain/repositories/player.repository";
import { PlayerEntity } from "../models/player.model";
import { getConnection } from "../db";
import { BaseError } from "../utils/errors/error";
import { StatusCodes } from "http-status-codes";

export class PlayerDAO implements PlayerRepository{
    repository: Repository<PlayerEntity>

    constructor(){
        getConnection().then(connection => {
            this.repository = connection.getRepository(PlayerEntity)
        })
    }
   
    async create(item: Player): Promise<Player> {
        return await this.repository.save(item) as Player;
    }
    async read(id: string): Promise<Player> {
        return await this.repository.findOneBy({id: id}) as Player;
    }
   async update(id: string, item: Player): Promise<Player> {
        const existingPlayer = await this.repository.findOneBy({ id: id });
        if (item === null|| Object.keys(item).length === 0) {
            throw new BaseError('No se proporcionó un objeto para actualizar.', StatusCodes.BAD_REQUEST);
          }
        const updatedPlayer = Object.assign({},existingPlayer, item);
        return await this.repository.save(updatedPlayer) as Player;
      }
    
    async delete(id: string): Promise<boolean> {
        const result =  await this.repository.delete({id: id});
        return result.affected ? true : false;
    }
    async search(name?: string, userCasinoId?: string, userId?: string, user?: string, casino?: string): Promise<Player[]>{
          const queryBuilder  = this.repository
          .createQueryBuilder("player")
          .leftJoinAndSelect("player.user_casino", "userCasino")
          .leftJoinAndSelect("userCasino.casino", "casino")
          .leftJoinAndSelect("userCasino.user", "user")
          .select([
            "player",
            "userCasino.id",
            "user.username",
            "user.email",
            "casino.id",
            "casino.name"
          ])

          if (userCasinoId) {
            queryBuilder.andWhere("userCasino.id = :userCasinoId", { userCasinoId });
          }

          if (name) {
            queryBuilder.andWhere("player.nickname ILike :name", { name: `%${name}%` });
          }

          if (userId) {
            queryBuilder.andWhere("user.id = :userId", { userId });
          }

          if (userId) {
            queryBuilder.andWhere("user.id = :userId", { userId });
          }

          if (user) {
            queryBuilder.andWhere("user.username ILike :user", { user: `%${user}%` });
          }

          if (casino) {
            queryBuilder.andWhere("casino.name ILike :casino", { casino: `%${casino}%` });
          }
          
          const result = await queryBuilder.getMany();

          return result;
    }
    searchDate: (query?: Date | undefined) => Promise<Player[]>;
}