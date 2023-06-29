import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CasinoEntity } from "./casino.model";
import { UserEntity } from "./user.model";
import { User_Casino } from "../domain/user_casino";
import { WithdrawalEntity } from "./withdrawal.model";
import { LoadEntity } from "./load.model";
import { User } from "../domain/user";
import { PlayerEntity } from "./player.model";
import { Player } from "../domain/player";
import { CoinsMovementsEntity } from "./coinsMovements.model";
import { CoinsMovements } from "../domain/coinsMovements";
import { Casino } from "../domain/casino";

@Entity({name: "user_casino"})
export class User_Casino_Entity implements User_Casino{

    @PrimaryGeneratedColumn("uuid")
    public id: string;
    @Column({name:"debits", type: "decimal", precision: 10, scale: 0, nullable: false})
    public debits: number;
    @Column({name:"credits", type: "decimal", precision: 10, scale: 0, nullable: false})
    public credits: number;
    @Column({name: "created_at", type: "timestamp", nullable: false, default: () => "now()",})
    public createdAt: Date;

    @ManyToOne(()=>UserEntity, (users) => users.user_casino)
    @JoinColumn({name: 'users_id', referencedColumnName: 'id'})
    public user: User;

    @ManyToOne(()=>CasinoEntity, (casino) => casino.user_casino)
    @JoinColumn({name: 'casino_id', referencedColumnName: 'id'})
    casino: Casino;

    //Relacion un user_casino tiene muchos withdrawal y withdrawal tiene un solo user_casino
    @OneToMany(() => WithdrawalEntity, (withdrawal)=> withdrawal.user_casino)
    withdrawal: WithdrawalEntity[];

    //Relacion un user_casino tiene muchos load y load tiene un solo user_casino
    @OneToMany(() => LoadEntity, (load)=> load.user_casino)
    load: LoadEntity[];

    @OneToMany(() => PlayerEntity, (player)=> player.user_casino)
    player: Player[];

    @OneToMany(() => CoinsMovementsEntity, (coinsMovements) => coinsMovements.userCasinoId)
    coinsMovements: CoinsMovements[];

   
}