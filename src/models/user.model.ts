import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { User, UserRole, UserStatus } from "../domain/user";

@Entity({ name: "users" })
export class UserEntity implements User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "username", type: "varchar", length: 128, nullable: false })
  username: string;

  @Column({ name: "password", type: "varchar" })
  password: string;

  @Column({ name: "phone", type: "varchar", length: 64, nullable: false })
  phone: string;

  @Column({ name: "role", type: "varchar" })
  role: UserRole;

  @Column({ name: "email", type: "varchar", length: 128})
  email: string;


  @Column({ name: "status", type: "varchar", nullable: false })
  status: UserStatus;

  @Column({
    name: "created_at",
    type: "timestamp",
    nullable: false,
    default: () => "now()",
  })
  createdAt: Date;

}
