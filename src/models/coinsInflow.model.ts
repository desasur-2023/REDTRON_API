import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.model";
import { User } from "../domain/user";
import { CoinsInflow } from "../domain/coinsInflow";
import { HistoricEntity } from "./historic.model";
import { Historic } from "../domain/historic";
import { User_Casino_Entity } from "./user_casino.model";
import { User_Casino } from "../domain/user_casino";
import { CoinsMovements } from "../domain/coinsMovements";
import { CoinsMovementsEntity } from "./coinsMovements.model";

@Entity({name: "coinsInflow"})
export class CoinsInflowEntity implements CoinsInflow {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({name:"quantity", type: "decimal", precision: 10, scale: 0, nullable: false})
    quantity: number;

    @Column({name: "created_at", type: "timestamp", nullable: false, default: () => "now()",})
    createdAt: Date;
 
    //Relacion un user tiene muchos coinsInflow y coinsInflow tiene un solo player
    @ManyToOne(() => UserEntity, (user) => user.coinsInflow)
    user: User;
   
    //Relacion un historic tiene muchos coinsInflow y coinsInflow tiene un solo historic
    @ManyToOne(() => HistoricEntity, (historic) => historic.coinsInflow)
    historic: Historic

    //Relacion un user_casino tiene muchos coinsInflow y coinsInflow tiene un solo user_casino
    @ManyToOne(() => User_Casino_Entity, (user_casino) => user_casino.coinsInflow)
    user_casino: User_Casino

    //Relacion un coinsMovements tiene muchos coinsInflow y coinsInflow tiene un solo coinsMovements
    @ManyToOne(() => CoinsMovementsEntity, (coinsMovements) => coinsMovements.coinsInflow)
    coinsMovements: CoinsMovements
}