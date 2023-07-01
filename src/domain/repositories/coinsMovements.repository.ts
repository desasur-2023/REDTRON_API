import { ICRUD } from "../../utils/interfaces/ICRUD";
import { ISearch } from "../../utils/interfaces/ISearch";
import { CoinsMovements } from "../coinsMovements";

export interface CoinsMovementsRepository extends ICRUD<CoinsMovements>, ISearch<CoinsMovements>{
}