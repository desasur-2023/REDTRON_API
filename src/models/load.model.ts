import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Load, LoadStatus } from "../domain/load";

@Entity({ name: "load" })
export class LoadEntity implements Load {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({ name:"trasfer_url", type: "varchar", length: 36, nullable: false})
    trasfer_url: string;
    @Column({name:"status", type: "enum", enum: LoadStatus, default: LoadStatus.PENDING})
    status: LoadStatus;
    @Column({name:"debits", type: "decimal", precision: 10, scale: 0, nullable: false})
    debits: number;
    @Column({name: "time", type: "timestamp", nullable: false, default: () => "now()",})
    time: Date;
    @Column({name: "created_at", type: "timestamp", nullable: false, default: () => "now()",})
    createdAt: Date;
}