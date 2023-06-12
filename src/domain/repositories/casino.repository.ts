import { ICRUD } from "../../utils/interfaces/ICRUD";
import { ISearch } from "../../utils/interfaces/ISearch";
import { Casino } from "../casino";

export interface CasinoRepository extends ICRUD<Casino>, ISearch<Casino>{
}