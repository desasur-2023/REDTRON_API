import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Casino, CasinoStatus } from "../domain/casino";
import { User_Casino_Entity } from "./user_casino.model";
import { User_Casino } from "../domain/user_casino";

@Entity('casino')
export class CasinoEntity implements Casino{
    
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({name: "name",type: "varchar", length: 32, nullable: false})
    name: string;

    @Column({name:"status", type: "enum", enum: CasinoStatus, default: CasinoStatus.ACTIVE})
    status: CasinoStatus;

    @Column({name: "image_url",type: "varchar", length: 255, nullable: true})
    imageUrl: string;
    
    @Column({name: "created_at",type: "timestamp",nullable: false,default: () => "now()",})
    createdAt: Date;

    @OneToMany(() => User_Casino_Entity, user_casino => user_casino.casino)
    user_casino: User_Casino[];
    
}