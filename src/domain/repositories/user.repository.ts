
import { ICRUD } from "../../utils/interfaces/ICRUD";
import { ISearch } from "../../utils/interfaces/ISearch";
import { User } from "../user";


export interface UserRepository extends ICRUD<User>, ISearch<User> {
  findByPhone(phone: string): Promise<User>;
  findByUserName(userName: string): Promise<User>;
  //loginUser(user: User): Promise<User | undefined>;
}
