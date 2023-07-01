import { ICRUD } from "../../utils/interfaces/ICRUD";
import { ISearch } from "../../utils/interfaces/ISearch";
import { SettleAcount } from "../settleAcount";


export interface SettleAcountRepository extends ICRUD<SettleAcount>, ISearch<SettleAcount>{
}