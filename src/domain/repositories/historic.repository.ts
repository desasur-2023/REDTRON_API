import { ICRUD } from "../../utils/interfaces/ICRUD";
import { ISearch } from "../../utils/interfaces/ISearch";
import { Historic } from "../historic";

export interface HistoricRepository extends ICRUD<Historic>, ISearch<Historic>{
}