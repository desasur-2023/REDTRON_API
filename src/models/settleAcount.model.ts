import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SettleAcount, SettleAcountStatus } from "../domain/settleAcount";
import { UserEntity } from "./user.model";
import { User } from "../domain/user";

@Entity({name: "settleAcount"})
export class SettleAcountEntity implements SettleAcount {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({name:"balance_due", type: "decimal", precision: 10, scale: 0, nullable: false})
    balance_due: number;

    @Column({name:"status", type: "enum", enum: SettleAcountStatus, default: SettleAcountStatus.PENDING})
    status: SettleAcountStatus;

    @Column({ name: "start_period", type: "timestamp", nullable: false })
    start_period: Date;

    @Column({name: "end_period", type: "timestamp", nullable: false, default: () => "now()",})
    end_period: Date;

    @Column({ name:"trasfer_url", type: "varchar", length: 200, nullable: false})
    transfer_url: string;
    
    @Column({name: "created_at", type: "timestamp", nullable: false, default: () => "now()",})
    createdAt: Date;

    @ManyToOne(() => UserEntity, (user) => user.settleAcount)
    user: User;
}