import { StatusCodes } from "http-status-codes";
import { CasinoDAO } from "../dao/casino.dao";
import { Casino } from "../domain/casino";
import { BaseError } from "../utils/errors/error";


const create = async (casino: Casino) => {
    const casinoDAO = await new CasinoDAO();
    const newCasino = await casinoDAO.create(casino).catch((error: Error) => new BaseError(error.message, StatusCodes.CONFLICT));
    return newCasino
}

const getAll = async (name?:string) => {
    const casinoDAO = await new CasinoDAO();
    const searchCasino = await casinoDAO.search(name).catch((error: Error) => new BaseError(error.message, StatusCodes.CONFLICT));
    return searchCasino;
}

const findOneById = async (id:string) => {
    const casinoDAO = await new CasinoDAO();
    const casinoId = await casinoDAO.read(id).catch((error: Error) => new BaseError(`The id: '${id}' does not belong to an existing casino.`, StatusCodes.CONFLICT));
    return casinoId;
}

const deleteCasino = async (id:string) => {
    const casinoDAO = await new CasinoDAO();
    const casinoDelet = casinoDAO.delete(id).catch((error: Error) => new BaseError(`The id: '${id}' does not belong to an existing casino.`, StatusCodes.CONFLICT));
    return casinoDelet
}

const update =async (id:string, item: Casino) => {
    const casinoDAO = await new CasinoDAO();
    const updateCasino = await casinoDAO.update(id, item).catch((error: Error) => new BaseError(error.message, StatusCodes.CONFLICT));
    return updateCasino;
}


export default {create, getAll, findOneById, deleteCasino, update}