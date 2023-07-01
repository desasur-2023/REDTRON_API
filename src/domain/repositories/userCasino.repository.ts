import { ICRUD } from "../../utils/interfaces/ICRUD";
import { ISearch } from "../../utils/interfaces/ISearch";
import { User_Casino } from "../user_casino";

export interface UserCasinoRepository extends ICRUD<User_Casino>, ISearch<User_Casino>{

}