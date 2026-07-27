import { userHandler } from "../handlers/user.handler";
import { token } from "../helpers/token";
import User from "../models/user.model";
import {
  creatUserDTO,
  loginUserDTO,
  UserWithSocialAccount,
} from "../types/type.auth";
import { authUtil } from "../utils/auth.util";
import { loginResponse } from "../types/type.auth";
import { userUtil } from "../utils/user.util";
import { AccountUtil } from "../utils/account.util";
import { AccountHandler } from "../handlers/account.handler";
import { Exception } from "../helpers/exception";
import { ERROR_MESSAGES } from "../constants/errorMessages";
import { STATUS_CODES, StatusCode } from "../constants/statusCode";
import { RefreshTokens } from "../types/type.auth";
export class authManager {
  static async createUser(userData: creatUserDTO): Promise<User> {
    await authUtil.verifyEmailRecod(userData.email);
    userData.password = await authUtil.getHashedPassword(userData.password);
    return await userHandler.creatUser(userData);
  }
  static async login(userData: loginUserDTO): Promise<loginResponse> {
    const user: User = await userUtil.getUserByEmail(userData.email);
    userUtil.isPasswordNull(user.password);
    userUtil.isEmailVerified(user?.isEmailVerified);
    await authUtil.matchPasswords(userData.password, user?.password as string);
    const accessToken = token.getAccessToken(user?.id);
    const refreshToken = token.getRefreshToken(user?.id);
    await userUtil.updateRefreshToken(refreshToken, user?.id);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
  static async continueWithSocialProfile(rawProfile: any) {
    const socialProfile = AccountUtil.extractSocialProfileData(rawProfile);
    const result =
      await AccountHandler.loginOrregisterUsingSocialProfile(socialProfile);
    const accessToken = token.getAccessToken(result.userId);
    const refreshToken = token.getRefreshToken(result.userId);
    await userHandler.updateRefreshToken(refreshToken, result.userId);
    const finalData = {
      ...result,
      auth_token: accessToken,
      refresh_token: refreshToken,
    };
    return finalData;
  }
  static async getUserProfile(id: number): Promise<UserWithSocialAccount> {
    const user = await userHandler.getUserProfile(id);
    if (!user) {
      throw new Exception(
        ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS,
        STATUS_CODES.BAD_REQUEST,
      );
    }
    return user
  }
  static async resetPassword(id: number, newPassword: string): Promise<void> {
    const hashedPassword = await authUtil.getHashedPassword(newPassword);
    await userHandler.updatePassword(id, hashedPassword);
  }
  
  static  refreshToken = async(id: number): Promise<RefreshTokens> =>  {
    const access_token = token.getAccessToken(id)
    const refresh_token = token.getRefreshToken(id)
    await userHandler.updateRefreshToken(refresh_token , id)
    return {
        auth_token: access_token,
        refresh_token: refresh_token
    }

  }
}
