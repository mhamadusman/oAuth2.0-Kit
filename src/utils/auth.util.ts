import User from "../models/user.model";
import { userHandler } from "../handlers/user.handler";
import { STATUS_CODES } from "../constants/statusCode";
import { Exception } from "../helpers/exception";
import { ERROR_MESSAGES } from "../constants/errorMessages";
import bcrypt from "bcrypt";
export class authUtil {
  static async verifyEmailRecod(email: string) {
    const user: User | null = await userHandler.getUserByEmail(email);
    if (user) {
      throw new Exception(
        ERROR_MESSAGES.AUTH.EMAIL_ALREADY_EXISTS,
        STATUS_CODES.CONFLICT,
      );
    }
  }
  static getHashedPassword = async (userPassword: string): Promise<string> => {
    const hashedPassword: string = await bcrypt.hash(userPassword, 10);
    return hashedPassword;
  };
  static matchPasswords = async (userInput: string,  dbPassword: string) => {
    const match = await bcrypt.compare(userInput, dbPassword);
    if (!match) {
      throw new Exception(
        ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS,
        STATUS_CODES.UNAUTHORIZED,
      );
    }
  };

 
}
