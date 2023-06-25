import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Withdrawal, WithdrawalStatus } from "../domain/withdrawal";
import { PlayerEntity } from "./player.model";

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
    player: PlayerEntity
}