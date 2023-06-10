import { StatusCodes } from "http-status-codes";
import { CasinoDAO } from "../dao/casino.dao";
import { Casino } from "../domain/casino";
import { BaseError } from "../utils/error";


export const crearCasinoController = async (casino: Casino) => {
    const casinoDAO = await new CasinoDAO();
    const newCasino = await casinoDAO.create(casino).catch((error: Error) => new BaseError(error.message, StatusCodes.CONFLICT));
    return newCasino
}