import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Casino } from "../domain/casino";

@Entity('casino')
export class CasinoEntity implements Casino{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({name: "name",type: "varchar", length: 32, nullable: false})
    name: string;
    
    @Column({name: "profits",type: "decimal", precision: 10, scale: 2,nullable: false})
    profits: string;

    @Column({name: "losses",type: "decimal", precision: 10, scale: 2, nullable: false})
    losses: string;
    
    @Column({name: "created_at",type: "timestamp",nullable: false,default: () => "now()",})
    createdAt: Date;

    
}