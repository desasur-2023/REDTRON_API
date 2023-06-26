import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Historic } from "../domain/historic";
import { WithdrawalEntity } from "./withdrawal.model";
import { LoadEntity } from "./load.model";
import { Withdrawal } from "../domain/withdrawal";
import { Load } from "../domain/load";

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
    withdrawal: Withdrawal[];

    //Relacion un historic tiene muchos load y load tiene un solo historic
    @OneToMany(() => LoadEntity, (load)=> load.historic)
    load: Load[];

}