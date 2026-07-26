import User from "../models/user.model";
import { creatUserDTO } from "../types/type.auth";
import { UserWithSocialAccount } from "../types/type.auth";
import Account from "../models/account.model";
export class userHandler {
  static async creatUser(data: creatUserDTO): Promise<User> {
    const newUser = await User.create({
      email: data.email,
      password: data.password,
      name: data.name
    });
    return newUser;
  }
  static async getUserByEmail(email: string): Promise<User | null> {
    const user = User.findOne({
      where: { email: email },
    });
    return user;
  }
  static async updateRefreshToken(
    refreshToken: string,
    id: number,
  ): Promise<void> {
    await User.update(
      { refreshToken: refreshToken },
      { where: { id: id } },
    );
  }
  static async updatePassword(id: number, newPassword: string): Promise<void> {
    await User.update({ password: newPassword }, { where: { id: id } });
  }
  static async getUserProfile(
    userId: number,
  ): Promise<UserWithSocialAccount | null> {
    const user = await User.findOne({
      where: { id: userId },
      attributes: [
        "id",
        "email",
        "name",
        "profileImage",
        "isEmailVerified",
        "createdAt",
        "updatedAt",
      ],
      include: [
        {
          model: Account,
          as: "accounts",
          attributes: [
            "id",
            "provider",
            "providerId",
            "createdAt",
            "updatedAt",
          ],
        },
      ],
    });

    if (!user) {
      return null;
    }

    return JSON.parse(JSON.stringify(user.get({ plain: true })));
  }
  static async updateAccountStatus(userId: number) {
    await User.update(
      { isEmailVerified: true },
      {
        where: {
          id: userId,
        },
      },
    );
  }
}
