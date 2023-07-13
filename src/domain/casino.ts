import { Base } from "../utils/common";


export interface Casino extends Base{
    name: string;
    status: CasinoStatus
    imageUrl: string;
}

export enum CasinoStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    DISABLED = 'DISABLED'
  }