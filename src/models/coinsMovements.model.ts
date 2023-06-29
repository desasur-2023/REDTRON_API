import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SettleAcount, SettleAcountStatus } from "../domain/settleAcount";
import { UserEntity } from "./user.model";
import { User } from "../domain/user";
import { CoinsMovements } from "../domain/coinsMovements";
import { CoinsInflowEntity } from "./coinsInflow.model";
import { CoinsInflow } from "../domain/coinsInflow";
import { Load } from "../domain/load";
import { LoadEntity } from "./load.model";

@Entity({name: "coinsMovements"})
export class CoinsMovementsEntity implements CoinsMovements {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({name:"inflow_qty", type: "decimal", precision: 10, scale: 0, nullable: false})
    inflow_qty: number;

    @Column({name:"outflow_qty", type: "decimal", precision: 10, scale: 0, nullable: false})
    outflow_qty: number;

    @Column({name:"balance", type: "decimal", precision: 10, scale: 0, nullable: false})
    balance: number;

    @Column({name: "created_at", type: "timestamp", nullable: false, default: () => "now()",})
    createdAt: Date;

    //Relacion un coinsMovements tiene muchos coinsInflow y coinsInflow tiene un solo coinsMovements
    @OneToMany(() => CoinsInflowEntity, (coinsInflow) => coinsInflow.coinsMovements)
    coinsInflow: CoinsInflow[];

    //Relacion un coinsMovements tiene muchos loads y load tiene un solo coinsMovements
    @OneToMany(() => LoadEntity, (load) => load.coinsMovements)
    load: Load[];
}