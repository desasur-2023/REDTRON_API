import { BeforeInsert, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Player } from "../domain/player";
import { CasinoEntity } from "./casino.model";
import { WithdrawalEntity } from "./withdrawal.model";

@Entity({ name: "player" })
export class PlayerEntity implements Player {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({ name: "nickname", type: "varchar", length: 32, nullable: false, unique: true })
    nickname: string;
    @Column({ name: "debits_profits", type: "decimal", precision: 10, scale: 2, nullable: true})
    debits_profits: number;
    @Column({ name: "teller", type: "varchar", length: 32, nullable: false })
    teller: string;
    @Column({name: "created_at", type: "timestamp", nullable: false, default: () => "now()",})
    createdAt: Date; 

    @ManyToOne(() => CasinoEntity, (casino) => casino.player)
    casino: CasinoEntity

    //Relacion un player tiene muchos withdrawal y withdrawal tiene un solo player
    @OneToMany(() => WithdrawalEntity, (withdrawal)=> withdrawal.player)
    withdrawal: WithdrawalEntity[];
}
