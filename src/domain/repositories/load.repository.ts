import { ICRUD } from "../../utils/interfaces/ICRUD";
import { ISearch } from "../../utils/interfaces/ISearch";
import { Load } from "../load";

export interface LoadRepository extends ICRUD<Load>, ISearch<Load>{
    searchDate: (query?: Date) => Promise<Load[]>;
}