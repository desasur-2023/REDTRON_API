import { StatusCodes } from "http-status-codes";
import { CasinoDAO } from "../dao/casino.dao";
import { Casino } from "../domain/casino";
import { BaseError } from "../utils/error";


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

export default {create, getAll}