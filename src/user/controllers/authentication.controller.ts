import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";


// export class AuthenticationService {
//   constructor(private repository: UserRepository) {}

//   async signup(user: User): Promise<User | undefined> {
//     if (await this.repository.findByPhone(user.phone)) {
//       throw new BaseError(
//         "Phone already in use",
//         StatusCodes.BAD_REQUEST
//       );
//     }
//     user.password = bcrypt.hashSync(user.password!, 10);
//     user.role = UserRole.TELLER;
//     user.status = UserStatus.INACTIVE;
//     user.email = user.email?.toLowerCase();
//     const result = await this.repository.create(user);
//     if (result) {
//       result.password = '';
//     }
//     return result;
//   }

//   async login(username: string, password: string): Promise<User | undefined> {
//     const user = await this.repository.findByUserName(username);

//     if (user && bcrypt.compareSync(password, user.password!)) {
//       user.password = '';
//       Object.assign(user, { token: this.generateToken(user) });
//       return user;
//     }
//     throw new BaseError("Invalid email or password", StatusCodes.UNAUTHORIZED);
//   }


//   private generateToken(u: User): string {
//     if (!process.env.JWT_SECRET) {
//       throw new ServerError("Cannot generate token");
//     }
//     return jwt.sign(
//       { userId: u.id, role: u.role } as TokenPayload,
//       process.env.JWT_SECRET!,
//       { expiresIn: "1h" }
//     );
//   }

  
// }
