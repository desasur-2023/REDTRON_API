import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { SettleAcount, SettleAcountStatus } from "../domain/settleAcount";
import { UserEntity } from "./user.model";
import { User } from "../domain/user";
import { CoinsMovements } from "../domain/coinsMovements";
import { Load } from "../domain/load";
import { LoadEntity } from "./load.model";
import { User_Casino_Entity } from "./user_casino.model";
import { User_Casino } from "../domain/user_casino";
import { HistoricEntity } from "./historic.model";
import { Historic } from "../domain/historic";

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

    @OneToOne(() => LoadEntity, {nullable: true})
    @JoinColumn({name: 'load_id', referencedColumnName: 'id'})
    load: Load;

    @OneToMany(() => UserEntity, (user) => user.coinsMovements)
    user: User[];

    @ManyToOne(() => HistoricEntity, (historic) => historic.coinsMovements)
    historic: Historic

    @ManyToOne(() => User_Casino_Entity, (userCasino) => userCasino.coinsMovements)
    @JoinColumn({name: 'user_casino_id', referencedColumnName: 'id'})
    userCasinoId: User_Casino_Entity;
}