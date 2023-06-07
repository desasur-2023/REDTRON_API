import { BaseError } from "../../../utils/error";
import { UserRepository } from "../../domain/repositories/user.repository";
import { User } from "../../domain/user.entity";


export class UserService {
  constructor(
    private repository: UserRepository
  ) {}

  async read(id: string): Promise<User | undefined> {
    return this.repository.read(id);
  }

  async update(id: string, item: User): Promise<boolean> {
    if (await this.repository.read(id)) {
      return this.repository.update(id, item);
    }
    throw new BaseError('User not found', 404);
  }

  async delete(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }

  async search(query?: string): Promise<User[]> {
    return (await this.repository.search(query)).map((user) => {
      user.password = '';
      return user;
    });
  }


}
