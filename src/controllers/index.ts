import { findOneById, create, getAll, del } from "./user.controller";
import { crearCasinoController } from "./casino.controller";


export default  { getAll , findOneById, create, delete: del, crearCasinoController}