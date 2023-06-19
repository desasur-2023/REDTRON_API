import { Base } from "../utils/common";


export interface Casino extends Base{
    name: string,
    profits: number,
    losses: number,
}