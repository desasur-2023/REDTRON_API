import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Historic } from "../domain/historic";
import { WithdrawalEntity } from "./withdrawal.model";

@Entity({name: "historic"})
export class HistoricEntity implements Historic {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({name: "time", type: "timestamp", nullable: false, default: () => "now()",})
    time: Date;
    @Column({name: "created_at", type: "timestamp", nullable: false, default: () => "now()",})
    createdAt: Date;

    //Relacion un historic tiene muchos withdrawal y withdrawal tiene un solo historic
    @OneToMany(() => WithdrawalEntity, (withdrawal)=> withdrawal.historic)
    withdrawal: WithdrawalEntity[];

}