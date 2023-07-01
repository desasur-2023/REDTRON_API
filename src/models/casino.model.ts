import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Casino } from "../domain/casino";

@Entity('casino')
export class CasinoEntity implements Casino{
    
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({name: "name",type: "varchar", length: 32, nullable: false})
    name: string;

    @Column({name: "image_url",type: "varchar", length: 255, nullable: true})
    imageUrl: string;
    
    @Column({name: "created_at",type: "timestamp",nullable: false,default: () => "now()",})
    createdAt: Date;

    
}