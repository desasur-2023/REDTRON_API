import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Casino } from "../domain/casino";
import { User_Casino_Entity } from "./user_casino.model";
import { PlayerEntity } from "./player.model";
import { User_Casino } from "../domain/user_casino";
import { Player } from "../domain/player";

@Entity('casino')
export class CasinoEntity implements Casino{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({name: "name",type: "varchar", length: 32, nullable: false})
    name: string;

    @Column({ name:"image_url", type: "varchar", length: 200, nullable: true})
    image_url: string;
    
    @Column({name: "created_at",type: "timestamp",nullable: false,default: () => "now()",})
    createdAt: Date;

    @OneToMany(() => User_Casino_Entity, user_casino => user_casino.casino)
    public user_casino: User_Casino[];
    
}