import { StatusCodes } from "http-status-codes";
import { PlayerDAO } from "../dao/player.dao";
import { UserCasinoDAO } from "../dao/userCasino.dao";
import { Player, PlayerStatus } from "../domain/player";
import { User_Casino } from "../domain/user_casino";
import { BaseError } from "../utils/errors/error";
import { PlayerEntity } from "../models/player.model";

const create = async (player: { userCasinoId: User_Casino["id"]; nickname: Player["nickname"] }) => {
    const playerDAO = await new PlayerDAO();
    const userCasinoDAO = await new UserCasinoDAO();
    const userCasino = await userCasinoDAO.findById(player.userCasinoId);
     if (Object.keys(userCasino).length === 0) {
      throw new BaseError('No se encontró un userCasino válido.', StatusCodes.BAD_REQUEST);
    }
     const newPlayer = new PlayerEntity();
    newPlayer.nickname = player.nickname;
    newPlayer.user_casino = userCasino;
     try {
      const result = await playerDAO.create(newPlayer);
      return result;
    } catch (error) {
    //Se busca mandar un mensaje más exacto que especifique la columna duplicada, para que desde el Font puedan
    //capturar el error y especificarle al usuario que dato exacto es el que está ingresando mal. Y no el mensaje
    //genérico de la columna duplicada...
      if (error.code === "23505") {
        const duplicatedColumn = error.detail.match(/\((.*?)\)/)[1];
        throw new BaseError(`La columna ${duplicatedColumn} está duplicada. Por favor, elige otro valor.`, StatusCodes.BAD_REQUEST);
      } else {
        throw error;
      }
    }
  };

  const get = async (name: string | undefined, userCasinoId: string | undefined, userId: string | undefined, user: string | undefined, casino: string | undefined) => {
    const playerDAO = await new PlayerDAO();
    const result = await playerDAO.search(name, userCasinoId, userId, user, casino)
    return result
  }

  const update = async (playerId: PlayerEntity["id"], item: Player) => {
    const playerDAO = await new PlayerDAO();
    const player = playerDAO.update(playerId, item).catch((error: Error) => new BaseError("No se puede modificar el player", StatusCodes.CONFLICT, error.message));
    return player
  }

  const logicalDeletion = async (playerId: PlayerEntity["id"]) => {
    const playerDAO = await new PlayerDAO();
    try {
      const player = await playerDAO.read(playerId);
      if (!player){
        throw new BaseError("Jugador no encontrado", StatusCodes.BAD_REQUEST);
      }
      let newStatus: PlayerStatus
      player.status === PlayerStatus.ACTIVE ? newStatus = PlayerStatus.DISABLED : newStatus = PlayerStatus.ACTIVE;
      const item = {
        status: newStatus
      }
      const result = await playerDAO.update(playerId, item as Player)
      return result;

    } catch (error) {
      throw error;
    }
   
  }

export default { create, get, update, logicalDeletion};