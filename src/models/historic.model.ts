import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Historic } from "../domain/historic";

@Entity({name: "historic"})
export class HistoricEntity implements Historic {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({name: "time", type: "timestamp", nullable: false, default: () => "now()",})
    time: Date;
    @Column({name: "created_at", type: "timestamp", nullable: false, default: () => "now()",})
    createdAt: Date;
}