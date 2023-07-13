import { Base } from "../utils/common";

export interface CoinsMovements extends Base {
    inflow_qty: number
    outflow_qty: number
    coins_balance: number
}