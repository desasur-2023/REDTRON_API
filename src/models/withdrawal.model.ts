import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Withdrawal, WithdrawalStatus } from "../domain/withdrawal";
import { PlayerEntity } from "./player.model";
import { HistoricEntity } from "./historic.model";
import { User_Casino_Entity } from "./user_casino.model";
import { Player } from "../domain/player";
import { Historic } from "../domain/historic";
import { User_Casino } from "../domain/user_casino";

@Entity({name: "withdrawal"})
export class WithdrawalEntity implements Withdrawal {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({name:"credits", type: "decimal", precision: 10, scale: 0, nullable: false})
    credits: number;
    @Column({name:"status", type: "enum", enum: WithdrawalStatus, default: WithdrawalStatus.PENDING})
    status: WithdrawalStatus;
    @Column({name: "time", type: "timestamp", nullable: false, default: () => "now()",})
    time: Date;
    @Column({ name:"trasfer_url", type: "varchar", length: 200, nullable: false})
    trasfer_url: string;
    @Column({name: "created_at", type: "timestamp", nullable: false, default: () => "now()",})
    createdAt: Date;

    //Relacion un player tiene muchos withdrawal y withdrawal tiene un solo player
    @ManyToOne(() => PlayerEntity, (player) => player.withdrawal)
    @JoinColumn({name: 'player_id', referencedColumnName: 'id'})
    player: Player;

    //Relacion un historic tiene muchos withdrawal y withdrawal tiene un solo historic
    @ManyToOne(() => HistoricEntity, (historic) => historic.withdrawal)
    @JoinColumn({name: 'historic_id', referencedColumnName: 'id'})
    historic: Historic;

    //Relacion un user_casino tiene muchos withdrawal y withdrawal tiene un solo user_casino
    @ManyToOne(() => User_Casino_Entity, (user_casino) => user_casino.withdrawal)
    @JoinColumn({name: 'user_casino_id', referencedColumnName: 'id'})
    user_casino: User_Casino;
}