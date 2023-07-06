import { Between, Repository } from "typeorm";
import { getConnection } from "../db";
import { BaseError } from "../utils/errors/error";
import { StatusCodes } from "http-status-codes";
import { CoinsMovementsRepository } from "../domain/repositories/coinsMovements.repository";
import { CoinsMovementsEntity } from "../models/coinsMovements.model";
import { CoinsMovements } from "../domain/coinsMovements";
import { UserCasinoDAO } from "./userCasino.dao";
import { User_Casino_Entity } from "../models/user_casino.model";
import { User_Casino } from "../domain/user_casino";
import { CoinsInflow } from "../interfaces/coinsInflow.interface";
import { User } from "../domain/user";

export class CoinsMovementsDAO implements CoinsMovementsRepository {
  repository: Repository<CoinsMovementsEntity>;
  user: User;
  userCasinoId: string;
  inflow_qty: number;
  coins_balance: number;
  outflow_qty: number;

  constructor() {
    getConnection().then((connection) => {
      this.repository = connection.getRepository(CoinsMovementsEntity);
    });
  }
  create(item: CoinsMovements): Promise<CoinsMovements> {
    throw new Error("Method not implemented.");
  }

  async createInflow(coinsMovement: CoinsMovements): Promise<CoinsMovements> {
    // const lastInput = await this.findLastInputByUserCasinoId(item.userCasinoId)
    // const coinsMovement = {
    //   inflow_qty: item.qty,
    //   outflow_qty: 0,
    //   coins_balance: lastInput.coins_balance + item.qty,
    //   user: item.userId,
    //   userCasinoId: item.userCasinoId
    // }
    return (await this.repository.save(coinsMovement)) as CoinsMovements;
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

  async findLastInputByUserCasinoId(userCasinoId: string): Promise<CoinsMovements> {
    // const userCasinoDAO = await new UserCasinoDAO();
    // const userCasino = await userCasinoDAO.search(id).catch(error => new BaseError('The ids does not belong to an existing user or casino.', StatusCodes.CONFLICT, error.message));
    // if(Object.keys(userCasino).length === 0) throw new BaseError('The id does not belong to an existing userCasino.', StatusCodes.CONFLICT);
    // const userCasinoId = userCasino.id
    // const userCasinoId = userCasino.id.toString()
    const lastInput = await this.repository.findOne({
      where: { 
        userCasinoId: userCasinoId
      },
      order: { createdAt: 'DESC'}
  }).catch(error => new BaseError(`The id: '${userCasinoId}' does not belong to an DAO existing userCasino.`, StatusCodes.CONFLICT, error.message));;
    console.log(lastInput);  

    if (!lastInput) throw new BaseError('No se encuentra el Movimiento de Fichas', StatusCodes.NOT_FOUND);
    return { ...lastInput } as CoinsMovements;
  }

  search: (query?: string | undefined) => Promise<CoinsMovements[]>;

  async searchDate(query?: Date): Promise<CoinsMovements[]> {
    if (!query) {
      return (await this.repository.find()) as CoinsMovements[];
    }

    const startDate = new Date(query.getFullYear(), query.getMonth(), query.getDate(), 0, 0, 0);
    const endDate = new Date(query.getFullYear(), query.getMonth(), query.getDate(), 23, 59, 59);

    return (await this.repository.find({ where: { createdAt: Between(startDate, endDate) } })) as CoinsMovements[];
  }

}