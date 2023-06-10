import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Casino } from "../domain/casino";

@Entity('casino')
export class CasinoEntity implements Casino{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({name: "name",type: "timestamp"})
    name: string;
    
    @Column({name: "profits",type: "timestamp"})
    profits: string;

    @Column({name: "losses",type: "timestamp"})
    losses: string;
    
    @Column({name: "created_at",type: "timestamp",nullable: false,default: () => "now()",})
    createdAt: Date;

    
}