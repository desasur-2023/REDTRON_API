import { DataSource } from "typeorm";

import { UserModel } from "./models/user.model";
import { User, UserStatus } from "../../domain/user.entity";

import { UserRepository } from "../../domain/repositories/user.repository";
import { getConnection } from "../../../connectionManager";

export class UserDAO implements UserRepository {
  private connection: DataSource;

  constructor() {
    getConnection().then((connection) => {
      this.connection = connection;
    });
  }
  findByPhone(phone: string): Promise<User | undefined> {
    throw new Error("Method not implemented.");
  }
  findByUserName(userName: string): Promise<User | undefined> {
    throw new Error("Method not implemented.");
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const result = await this.connection
      .createQueryBuilder()
      .select("user")
      .from(UserModel, "user")
      .where("user.email = :email", { email })
      .loadAllRelationIds()
      .getOne();

    return result ? (result as User) : undefined;
  }

  async findById(id: string): Promise<User | undefined> {
    const result = await this.connection
      .getRepository(UserModel)
      .createQueryBuilder("user")
      .where("user.id = :id", { id })
      .loadAllRelationIds()
      .getOne();

    return result ? (result as User) : undefined;
  }

  async create(item: User): Promise<User | undefined> {
    const result = await this.connection
      .createQueryBuilder()
      .insert()
      .into(UserModel)
      .values(item)
      .returning("*")
      .execute();

    return result.generatedMaps.length > 0
      ? (result.generatedMaps[0] as User)
      : undefined;
  }

  async read(id: string): Promise<User | undefined> {
    const result = await this.connection
      .createQueryBuilder()
      .select("user")
      .from(UserModel, "user")
      .where("user.id = :id", { id })
      .getOne();

    return result ? (result as User) : undefined;
  }

  async update(id: string, item: User): Promise<boolean> {
    const result = await this.connection
      .createQueryBuilder()
      .update(UserModel)
      .set(item)
      .where("id = :id", { id })
      .execute();

    return result.affected ? result.affected > 0 : false;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.connection
      .createQueryBuilder()
      .delete()
      .from(UserModel)
      .where("id = :id", { id })
      .execute();

    return result.affected ? result.affected > 0 : false;
  }

  async search(query?: string): Promise<User[]> {
    let sql = `SELECT * 
                FROM users`;
    if (query) {
      sql += `WHERE name ILIKE '%${query}%' 
              OR lastname ILIKE '%${query}%' 
              OR email ILIKE '%${query}%'`;
    }
    const result = await this.connection.manager.query(sql);

    return result ? (result as User[]) : [];
  }

  async disable(id: string): Promise<boolean> {
    const result = await this.connection
      .createQueryBuilder()
      .update(UserModel)
      .set({ status: UserStatus.DISABLED })
      .where("id = :id", { id })
      .execute();

    return result.affected ? result.affected > 0 : false;
  }

  async findByResetToken(resetToken: string): Promise<User | undefined> {
    const result = await this.connection
      .getRepository(UserModel)
      .createQueryBuilder("user")
      .where("user.resetToken = :resetToken", { resetToken })
      .loadAllRelationIds()
      .getOne();

    return result ? (result as User) : undefined;
  }

  async updateAcceptedTermsConditionsForActiveUsers(): Promise<boolean> {
    const result = await this.connection
      .createQueryBuilder()
      .update(UserModel)
      .set({ acceptedTermsConditions: false })
      .where("status = :status", { status: UserStatus.ACTIVE })
      .execute();

    return result.affected ? result.affected > 0 : false;
  }
}
