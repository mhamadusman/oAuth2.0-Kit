import { ERROR_MESSAGES } from "../constants/errorMessages";
import { STATUS_CODES } from "../constants/statusCode";
import { userHandler } from "../handlers/user.handler";
import { Exception } from "../helpers/exception";
import User from "../models/user.model";
export class userUtil {
  static async getUserByEmail(email: string): Promise<User> {
    const user: User | null = await userHandler.getUserByEmail(email);
    if (!user) {
      throw new Exception(
        ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS,
        STATUS_CODES.UNAUTHORIZED,
      );
    }
    return user;
  }
  static async isUserExist(email: string): Promise<boolean>{
    if(await userHandler.getUserByEmail(email)){
      return true
    }
     return false
  }
  static updateRefreshToken = async (
    refreshToken: string,
    email: string,
  ): Promise<void> => {
    await userHandler.updateRefreshToken(refreshToken, email);
  };
  static isEmailVerified(emailStatus: boolean) {
    if (!emailStatus) {
      throw new Exception(
        ERROR_MESSAGES.AUTH.EMAIL_NOT_VERIFIED,
        STATUS_CODES.FORBIDDEN,
      );
    }
  }
  static isPasswordNull(password: string | null) {
    if (!password) {
      throw new Exception(
        ERROR_MESSAGES.AUTH.LOGIN_WITH_SOCIAL_PROFILE,
        STATUS_CODES.FORBIDDEN,
      );
    }
  }
}
