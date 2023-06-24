import { ICRUD } from "../../utils/interfaces/ICRUD";
import { ISearch } from "../../utils/interfaces/ISearch";
import { Player } from "../player";

export interface PlayerRepository extends ICRUD<Player>, ISearch<Player>{
}