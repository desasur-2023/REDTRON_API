import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Player } from "../domain/player";
import { CasinoEntity } from "./casino.model";
import { WithdrawalEntity } from "./withdrawal.model";
import { LoadEntity } from "./load.model";
import { Casino } from "../domain/casino";
import { Withdrawal } from "../domain/withdrawal";
import { Load } from "../domain/load";
import { User_Casino } from "../domain/user_casino";
import { User_Casino_Entity } from "./user_casino.model";

@Entity({ name: "player" })
export class PlayerEntity implements Player {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({ name: "nickname", type: "varchar", length: 32, nullable: false, unique: true })
    nickname: string;
    @Column({ name: "debits_profits", type: "decimal", precision: 10, scale: 2, nullable: true})
    debits_profits: number;
    @Column({name: "created_at", type: "timestamp", nullable: false, default: () => "now()",})
    createdAt: Date; 

    @ManyToOne(() => User_Casino_Entity, (user_casino) => user_casino.player)
    user_casino: User_Casino;

    //Relacion un player tiene muchos withdrawal y withdrawal tiene un solo player
    @OneToMany(() => WithdrawalEntity, (withdrawal)=> withdrawal.player)
    withdrawal: Withdrawal[];

    //Relacion un player tiene muchos load y load tiene un solo player
    @OneToMany(() => LoadEntity, (load)=> load.player)
    load: Load[];
}
