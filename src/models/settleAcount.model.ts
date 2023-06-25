import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { SettleAcount, SettleAcountStatus } from "../domain/settleAcount";

@Entity({name: "settleAcount"})
export class SettleAcountEntity implements SettleAcount {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({name:"balance_due", type: "decimal", precision: 10, scale: 0, nullable: false})
    balance_due: number;

    @Column({name:"status", type: "enum", enum: SettleAcountStatus, default: SettleAcountStatus.PENDING})
    status: SettleAcountStatus;

    @Column({ name: "period", type: "json", nullable: false })
    period: { start: Date; end: Date; };

    @Column({name: "time", type: "timestamp", nullable: false, default: () => "now()",})
    time: Date;

    @Column({ name:"trasfer_url", type: "varchar", length: 200, nullable: false})
    transfer_url: string;
    
    @Column({name: "created_at", type: "timestamp", nullable: false, default: () => "now()",})
    createdAt: Date;
}