import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Load, LoadStatus } from "../domain/load";
import { PlayerEntity } from "./player.model";
import { HistoricEntity } from "./historic.model";
import { User_Casino_Entity } from "./user_casino.model";
import { Player } from "../domain/player";
import { Historic } from "../domain/historic";
import { User_Casino } from "../domain/user_casino";
import { CoinsMovementsEntity } from "./coinsMovements.model";
import { CoinsMovements } from "../domain/coinsMovements";

@Entity({ name: "load" })
export class LoadEntity implements Load {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({ name:"trasfer_url", type: "varchar", length: 200, nullable: false})
    trasfer_url: string;
    @Column({name:"status", type: "enum", enum: LoadStatus, default: LoadStatus.PENDING})
    status: LoadStatus;
    @Column({name:"debits", type: "decimal", precision: 10, scale: 0, nullable: false})
    debits: number;
    @Column({name:"coins_outflow_qty", type: "decimal", precision: 10, scale: 0, nullable: false})
    coins_outflow_qty: number;
    @Column({name: "time", type: "timestamp", nullable: false, default: () => "now()",})
    time: Date;
    @Column({name: "created_at", type: "timestamp", nullable: false, default: () => "now()",})
    createdAt: Date;

    //Relacion un player tiene muchos load y load tiene un solo player
    @ManyToOne(() => PlayerEntity, (player) => player.load)
    player: Player

    //Relacion un historic tiene muchos load y load tiene un solo historic
    @ManyToOne(() => HistoricEntity, (historic) => historic.load)
    historic: Historic

    //Relacion un user_casino tiene muchos load y load tiene un solo user_casino
    @ManyToOne(() => User_Casino_Entity, (user_casino) => user_casino.load)
    user_casino: User_Casino

    // //Relacion un coinsMovements tiene muchos load y load tiene un solo coinsMovements
    // @ManyToOne(() => CoinsMovementsEntity, (coinsMovements) => coinsMovements.load)
    // coinsMovements: CoinsMovements
}