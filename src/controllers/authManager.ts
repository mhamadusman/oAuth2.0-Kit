import { userHandler } from "../handlers/user.handler";
import { token } from "../helpers/token";
import User from "../models/user.model";
import { creatUserDTO, loginUserDTO } from "../types/type.auth";
import { authUtil } from "../utils/auth.util";
import { loginResponse } from "../types/type.auth";
import { userUtil } from "../utils/user.util";

export class authManager {
  static async createUser(userData: creatUserDTO): Promise<User> {
    await authUtil.verifyEmailRecod(userData.email);
    userData.password = await authUtil.getHashedPassword(userData.password);
    return await userHandler.creatUser(userData);
  }
  static async login(userData: loginUserDTO): Promise<loginResponse> {
    const user: User | null = await userUtil.getUserByEmail(userData.email);
    await authUtil.matchPasswords(userData.password, user?.password as string);
    const accessToken = token.getAccessToken(user?.id);
    const refreshToken = token.getRefreshToken(user?.id);
    await userUtil.updateRefreshToken(refreshToken, userData.email);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
  static async resetPassword(id: number ,newPassword: string): Promise<void>{
    const hashedPassword = await authUtil.getHashedPassword(newPassword)
    await userHandler.updatePassword(id , hashedPassword)
  }
  
}
