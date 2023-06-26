import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { User, UserRole, UserStatus, defaultValues } from "../domain/user";
import { User_Casino_Entity } from "./user_casino.model";
import { SettleAcountEntity } from "./settleAcount.model";
import { User_Casino } from "../domain/user_casino";
import { SettleAcount } from "../domain/settleAcount";



@Entity({ name: "users" })
export class UserEntity implements User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "username", type: "varchar", length: 32, nullable: false, unique: true })
  username: string;

  @Column({ name: "password", type: "varchar",length: 128, nullable: true, default: "Redtron2013" })
  password: string;

  @Column({ name: "phone", type: "varchar", length: 64, nullable: false, unique:true })
  phone: string;

  @Column({ name: "role", type: "enum", enum: UserRole, default: UserRole.TELLER })
  role: UserRole;

  @Column({ name: "email", type: "varchar", length: 128, default: defaultValues.email })
  email: string;

  @Column({ name: "status", type: "enum", enum: UserStatus,default: UserStatus.INACTIVE })
  status: UserStatus;

  @Column({name: "token", type:"varchar", nullable: true})
  token: string;

  @Column({name: "percent_agreement",type: "decimal", precision: 10, scale: 0, nullable: false})
  percent_agreement: number;

  @Column({name: "total_balance",type: "decimal", precision: 10, scale: 2, nullable: true})
  total_balance: number;

  @Column({name: "last_settle_date", type: "timestamp", nullable: true})
  last_settle_date: Date;

  @Column({name: "created_at", type: "timestamp", nullable: false, default: () => "now()",})
  createdAt: Date;
  
  @OneToMany(() => User_Casino_Entity, user_casino => user_casino.user)
  public user_casino: User_Casino[];

  @OneToMany(() => SettleAcountEntity, (settleAcount)=> settleAcount.user)
  settleAcount: SettleAcount[];
}
