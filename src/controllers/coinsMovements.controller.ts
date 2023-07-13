import { StatusCodes } from "http-status-codes";
import { CasinoDAO } from "../dao/casino.dao";
import { Casino } from "../domain/casino";
import { isValidUUID } from "../utils/functions/comprobarUUID";
import { BaseError } from "../utils/errors/error";
import { CoinsMovementsDAO } from "../dao/coinsMovements.dao";
import { UserCasinoDAO } from "../dao/userCasino.dao";
import { UserDAO } from "../dao/user.dao";
import { CoinsInflow } from "../interfaces/coinsInflow.interface";
import { User } from "../domain/user";
import { User_Casino } from "../domain/user_casino";
import { CoinsMovementsEntity } from "../models/coinsMovements.model";
import { CoinsOutflow } from "../interfaces/coinsOutflow.interface";
import { HistoricDAO } from "../dao/historic.dao";
import { Historic } from "../domain/historic";
import { CoinsMovements } from "../domain/coinsMovements";


const createCoinsInflow = async (item: CoinsInflow) => {

    if (!isValidUUID(item.userId)) throw new BaseError('Invalid userid format', StatusCodes.BAD_REQUEST);
    if (!isValidUUID(item.userCasinoId)) throw new BaseError('Invalid userCasinoId format', StatusCodes.BAD_REQUEST);

    const userDAO = await new UserDAO();
    const user = await userDAO.read(item.userId)
    if (Object.keys(user).length === 0) throw new BaseError(`The id: '${item.userId}' does not belong to an existing user.`, StatusCodes.CONFLICT);
    if (user.role !== 'ADMIN') throw new BaseError('This User is not enabled to perform that action.', StatusCodes.CONFLICT);

    const userCasinoDAO = await new UserCasinoDAO();
    const userCasino = await userCasinoDAO.findById(item.userCasinoId)
    if (Object.keys(userCasino).length === 0) throw new BaseError('The id does not belong to an existing userCasino.', StatusCodes.CONFLICT);
    if (userCasino.status !== 'ACTIVE') throw new BaseError('The userCasino status is not ACTIVE.', StatusCodes.CONFLICT);

    const coinsMovementsDAO = await new CoinsMovementsDAO();
    const lastMovementByUserCasinoId = await coinsMovementsDAO.findLastInputByUserCasinoId(userCasino.id).catch(error => new BaseError(`The id: '${userCasino.id}' does not belong to an existing userCasino.`, StatusCodes.CONFLICT, error.message));
    if (lastMovementByUserCasinoId instanceof BaseError) throw new BaseError(`The id: '${userCasino.id}' does not belong to an existing userCasino.`, StatusCodes.CONFLICT)
    if (Object.keys(lastMovementByUserCasinoId).length === 0) {

        const it = {} as Historic;
        const historicDAO = await new HistoricDAO();
        const historic = await historicDAO.create(it).catch(error => new BaseError('Could not register historic', StatusCodes.CONFLICT, error.message));

        const coinsMovement = new CoinsMovementsEntity();
        coinsMovement.user = user.id as unknown as User
        coinsMovement.userCasinoId = userCasino.id as unknown as User_Casino
        coinsMovement.historic = historic as unknown as Historic
        coinsMovement.inflow_qty = item.inflow_qty
        coinsMovement.outflow_qty = 0
        coinsMovement.coins_balance = item.inflow_qty

        const newCoinsMovement = await coinsMovementsDAO.createCoinsFlow(coinsMovement)
        return newCoinsMovement;
    }
    const it = {} as Historic;
    const historicDAO = await new HistoricDAO();
    const historic = await historicDAO.create(it).catch(error => new BaseError('Could not register historic', StatusCodes.CONFLICT, error.message));

    const coinsMovement = new CoinsMovementsEntity();
    coinsMovement.user = user.id as unknown as User
    coinsMovement.userCasinoId = userCasino.id as unknown as User_Casino
    coinsMovement.historic = historic as unknown as Historic
    coinsMovement.inflow_qty = item.inflow_qty
    coinsMovement.outflow_qty = 0
    coinsMovement.coins_balance = Math.floor(lastMovementByUserCasinoId.coins_balance) + item.inflow_qty

    const newCoinsMovement = await coinsMovementsDAO.createCoinsFlow(coinsMovement)
    return newCoinsMovement;
}

const createCoinsOutflow = async (item: CoinsOutflow) => {

    if (!isValidUUID(item.userId)) throw new BaseError('Invalid userid format', StatusCodes.BAD_REQUEST);
    if (!isValidUUID(item.userCasinoId)) throw new BaseError('Invalid userCasinoId format', StatusCodes.BAD_REQUEST);

    const userDAO = await new UserDAO();
    const user = await userDAO.read(item.userId)
    if (Object.keys(user).length === 0) throw new BaseError(`The id: '${item.userId}' does not belong to an existing user.`, StatusCodes.CONFLICT);
    if (user.role !== 'TELLER') throw new BaseError('This User is not enabled to perform that action.', StatusCodes.CONFLICT);

    const userCasinoDAO = await new UserCasinoDAO();
    const userCasino = await userCasinoDAO.findById(item.userCasinoId)
    if (Object.keys(userCasino).length === 0) throw new BaseError('The id does not belong to an existing userCasino.', StatusCodes.CONFLICT);
    if (userCasino.status !== 'ACTIVE') throw new BaseError('The userCasino status is not ACTIVE.', StatusCodes.CONFLICT);
    if (userCasino.user.id !== item.userId) throw new BaseError('This User is not enabled to perform that action.', StatusCodes.CONFLICT);

    const coinsMovementsDAO = await new CoinsMovementsDAO();
    const lastMovementByUserCasinoId = await coinsMovementsDAO.findLastInputByUserCasinoId(userCasino.id).catch(error => new BaseError(`The id: '${userCasino.id}' does not belong to an existing userCasino.`, StatusCodes.CONFLICT, error.message));
    if (lastMovementByUserCasinoId instanceof BaseError) throw new BaseError(`The id: '${userCasino.id}' does not belong to an existing userCasino.`, StatusCodes.CONFLICT)
    if (Object.keys(lastMovementByUserCasinoId).length === 0) throw new BaseError('The userCasino does not have any coins', StatusCodes.CONFLICT)
    if (lastMovementByUserCasinoId.coins_balance - item.outflow_qty < 0) throw new BaseError('The userCasino does not have enough coins ', StatusCodes.CONFLICT)

    const it = {} as Historic;
    const historicDAO = await new HistoricDAO();
    const historic = await historicDAO.create(it).catch(error => new BaseError('Could not register historic', StatusCodes.CONFLICT, error.message));

    const coinsMovement = new CoinsMovementsEntity();
    coinsMovement.user = user.id as unknown as User
    coinsMovement.userCasinoId = userCasino.id as unknown as User_Casino
    coinsMovement.historic = historic as unknown as Historic
    coinsMovement.inflow_qty = 0
    coinsMovement.outflow_qty = item.outflow_qty
    coinsMovement.coins_balance = Math.floor(lastMovementByUserCasinoId.coins_balance) - item.outflow_qty

    const newCoinsMovement = await coinsMovementsDAO.createCoinsFlow(coinsMovement)
    return newCoinsMovement;
}

const getAll = async (user?: string, userCasinoId?: string) => {
    const casinoDAO = await new CoinsMovementsDAO();
    const searchCasino = await casinoDAO.search(user, userCasinoId).catch((error: Error) => new BaseError(error.message, StatusCodes.CONFLICT));
    return searchCasino;
}

const findOneById = async (id: string) => {
    const casinoDAO = await new CasinoDAO();
    const casinoId = await casinoDAO.read(id).catch((error: Error) => new BaseError(`The id: '${id}' does not belong to an existing casino.`, StatusCodes.CONFLICT));
    return casinoId;
}

const deleteCoinsMovement = async (id: string) => {
    const coinsMovementsDAO = await new CoinsMovementsDAO();
    const coinsMovementDeleted = coinsMovementsDAO.delete(id).catch((error: Error) => new BaseError(`The id: '${id}' does not belong to an existing Coins Movement.`, StatusCodes.CONFLICT));
    return coinsMovementDeleted
}

const update = async (id: string, item: CoinsMovements) => {
    const coinsMovementsDAO = await new CoinsMovementsDAO();
    const coinsMovementUpdated = await coinsMovementsDAO.update(id, item).catch((error: Error) => new BaseError(error.message, StatusCodes.CONFLICT));
    return coinsMovementUpdated;
}


export default { createCoinsInflow, createCoinsOutflow, getAll, findOneById, deleteCoinsMovement, update }