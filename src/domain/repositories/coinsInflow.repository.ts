import { ICRUD } from "../../utils/interfaces/ICRUD";
import { ISearch } from "../../utils/interfaces/ISearch";
import { CoinsInflow } from "../coinsInflow";

export interface CoinsInflowRepository extends ICRUD<CoinsInflow>, ISearch<CoinsInflow>{
}