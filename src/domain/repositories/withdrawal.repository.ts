import { ICRUD } from "../../utils/interfaces/ICRUD";
import { ISearch } from "../../utils/interfaces/ISearch";
import { Withdrawal } from "../withdrawal";


export interface WithdrawalRepository extends ICRUD<Withdrawal>, ISearch<Withdrawal>{
}