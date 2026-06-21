import User from "../models/user.model";
import { creatUserDTO } from "../types/type.auth";

export class userHandler {
  static async creatUser(data: creatUserDTO) {
    await User.create({
      email: data.email,
      password: data.password,
    });
  }
  static async getUserByEmail(email: string): Promise<User | null> {
    const user = User.findOne({
      where: { email: email },
    });
    return user;
  }
  static async updateRefreshToken(
    refreshToken: string,
    email: string,
  ): Promise<void> {
    await User.update(
      { refreshToken: refreshToken },
      { where: { email: email } },
    );
  }
}
