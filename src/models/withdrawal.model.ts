import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Withdrawal, WithdrawalStatus } from "../domain/withdrawal";

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
}