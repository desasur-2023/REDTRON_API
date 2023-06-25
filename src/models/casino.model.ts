import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Casino } from "../domain/casino";
import { User_Casino_Entity } from "./user_casino.model";
import { PlayerEntity } from "./player.model";

@Entity('casino')
export class CasinoEntity implements Casino{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({name: "name",type: "varchar", length: 32, nullable: false})
    name: string;
    
    @Column({name: "profits",type: "decimal", precision: 10, scale: 2,nullable: false})
    profits: number;

    @Column({name: "losses",type: "decimal", precision: 10, scale: 2, nullable: false})
    losses: number;
    
    @Column({name: "created_at",type: "timestamp",nullable: false,default: () => "now()",})
    createdAt: Date;

    @OneToMany(() => User_Casino_Entity, user_casino => user_casino.casino)
    public user_casino: User_Casino_Entity[];

    @OneToMany(() => PlayerEntity, (player)=> player.casino)
    player: PlayerEntity[];
    
}