import { StatusCodes } from "http-status-codes";
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
    const lastMovementByUserCasinoId = await coinsMovementsDAO.findLastInputByUserCasinoId(userCasino.id);
    //if (lastMovementByUserCasinoId instanceof BaseError) throw new BaseError(`The id: '${userCasino.id}' does not belong to an existing userCasino.`, StatusCodes.CONFLICT)
    if (!lastMovementByUserCasinoId) {

        // Lo dejamos para despues al historico. Paso a paso
        // const it = {} as Historic;
        // const historicDAO = await new HistoricDAO();
        // const historic = await historicDAO.create(it).catch(error => new BaseError('Could not register historic', StatusCodes.CONFLICT, error.message));

        const coinsMovement = new CoinsMovementsEntity();
        coinsMovement.user = user.id as unknown as User
        coinsMovement.userCasinoId = userCasino.id as unknown as User_Casino
        //coinsMovement.historic = historic as unknown as Historic
        coinsMovement.inflow_qty = item.inflow_qty
        coinsMovement.outflow_qty = 0
        coinsMovement.coins_balance = item.inflow_qty

        const newCoinsMovement = await coinsMovementsDAO.createCoinsFlow(coinsMovement)
        return newCoinsMovement;
    }
    // const it = {} as Historic;
    // const historicDAO = await new HistoricDAO();
    // const historic = await historicDAO.create(it).catch(error => new BaseError('Could not register historic', StatusCodes.CONFLICT, error.message));

    const coinsMovement = new CoinsMovementsEntity();
    coinsMovement.user = user.id as unknown as User
    coinsMovement.userCasinoId = userCasino.id as unknown as User_Casino
    //coinsMovement.historic = historic as unknown as Historic
    coinsMovement.inflow_qty = item.inflow_qty
    coinsMovement.outflow_qty = 0
    coinsMovement.coins_balance = Math.floor(lastMovementByUserCasinoId.coins_balance) + item.inflow_qty

    const newCoinsMovement = await coinsMovementsDAO.createCoinsFlow(coinsMovement)
    return newCoinsMovement;
}

const createCoinsOutflow = async (item: CoinsOutflow) => {

    // if (!isValidUUID(item.userId)) throw new BaseError('Invalid userid format', StatusCodes.BAD_REQUEST);
    // if (!isValidUUID(item.userCasinoId)) throw new BaseError('Invalid userCasinoId format', StatusCodes.BAD_REQUEST);

    // const userDAO = await new UserDAO();
    // const user = await userDAO.read(item.userId)
    // if (Object.keys(user).length === 0) throw new BaseError(`The id: '${item.userId}' does not belong to an existing user.`, StatusCodes.CONFLICT);
    // if (user.role !== 'TELLER') throw new BaseError('This User is not enabled to perform that action.', StatusCodes.CONFLICT);

    // const userCasinoDAO = await new UserCasinoDAO();
    // const userCasino = await userCasinoDAO.findById(item.userCasinoId)
    // if (Object.keys(userCasino).length === 0) throw new BaseError('The id does not belong to an existing userCasino.', StatusCodes.CONFLICT);
    // if (userCasino.status !== 'ACTIVE') throw new BaseError('The userCasino status is not ACTIVE.', StatusCodes.CONFLICT);
    // if (userCasino.user.id !== item.userId) throw new BaseError('This User is not enabled to perform that action.', StatusCodes.CONFLICT);

    // const coinsMovementsDAO = await new CoinsMovementsDAO();
    // const lastMovementByUserCasinoId = await coinsMovementsDAO.findLastInputByUserCasinoId(userCasino.id).catch(error => new BaseError(`The id: '${userCasino.id}' does not belong to an existing userCasino.`, StatusCodes.CONFLICT, error.message));
    // if (lastMovementByUserCasinoId instanceof BaseError) throw new BaseError(`The id: '${userCasino.id}' does not belong to an existing userCasino.`, StatusCodes.CONFLICT)
    // if (Object.keys(lastMovementByUserCasinoId).length === 0) throw new BaseError('The userCasino does not have any coins', StatusCodes.CONFLICT)
    // if (lastMovementByUserCasinoId.coins_balance - item.outflow_qty < 0) throw new BaseError('The userCasino does not have enough coins ', StatusCodes.CONFLICT)

    // const it = {} as Historic;
    // const historicDAO = await new HistoricDAO();
    // const historic = await historicDAO.create(it).catch(error => new BaseError('Could not register historic', StatusCodes.CONFLICT, error.message));

    // const coinsMovement = new CoinsMovementsEntity();
    // coinsMovement.user = user.id as unknown as User
    // coinsMovement.userCasinoId = userCasino.id as unknown as User_Casino
    // coinsMovement.historic = historic as unknown as Historic
    // coinsMovement.inflow_qty = 0
    // coinsMovement.outflow_qty = item.outflow_qty
    // coinsMovement.coins_balance = Math.floor(lastMovementByUserCasinoId.coins_balance) - item.outflow_qty

    // const newCoinsMovement = await coinsMovementsDAO.createCoinsFlow(coinsMovement)
    // return newCoinsMovement;
    throw Error("Method not implemented")
}

const getAll = async (userId?: string, casinoId?: string) => {
    const coinsMovementsDAO = await new CoinsMovementsDAO();
    return (await coinsMovementsDAO.search(userId, casinoId).catch((error: Error) => new BaseError("No se pudo buscar los movimientos de fichas", StatusCodes.CONFLICT, error.message)));
}

const getByDate = async (date) => {
    const coinsMovementsDAO = await new CoinsMovementsDAO();
    return (await coinsMovementsDAO.search(date).catch((error: Error) => new BaseError("No se pudo buscar los movimientos de fichas", StatusCodes.CONFLICT, error.message)));
}

const findOneById = async (id: string) => {
    const coinsMovementsDAO = await new CoinsMovementsDAO();
    return (await coinsMovementsDAO.read(id).catch((error: Error) => new BaseError("No se pudo encontrar el movimiento de fichas", StatusCodes.CONFLICT, error.message)));
     
}

const deleteCoinsMovement = async (id: string) => {
    const coinsMovementsDAO = await new CoinsMovementsDAO();
    return (await coinsMovementsDAO.delete(id).catch((error: Error) => new BaseError("No se pudo eliminar el movimiento de fichas", StatusCodes.CONFLICT, error.message)));
}  

const update = async (id: string, item: CoinsMovements) => {
    const coinsMovementsDAO = await new CoinsMovementsDAO();
    return (await coinsMovementsDAO.update(id, item).catch((error: Error) => new BaseError("No se pudo actualizar el movimiento de fichas", StatusCodes.CONFLICT, error.message)));
}


export default { createCoinsInflow, createCoinsOutflow, getAll, getByDate, findOneById, deleteCoinsMovement, update }