import crypto from "crypto";
import { verification } from "../types/type.verification";
import { Exception } from "../helpers/exception";
import { ERROR_MESSAGES } from "../constants/errorMessages";
import { STATUS_CODES } from "../constants/statusCode";
import { verificationHandler } from "../handlers/verification.handler";
import Verification from "../models/verification.model";
export class verificationUtil {
  static async verificationUtil(token: string) {}
  static generateEmailVerificationLink(token: string): string {
    return `http://localhost:5000/api/v1/auth/verify-password-reset-url?token=${token}`;
  }
  static getEmailVerificationToken(): string {
    return crypto.randomBytes(32).toString("hex");
  }
  static createVerificatonRecord(id: number): verification {
    const emailVerificationToken: string = this.getEmailVerificationToken();
    const expiredAt = new Date(Date.now() + 1 * 60 * 60 * 1000);
    return {
      verificationToken: emailVerificationToken,
      expiredAt: expiredAt,
      userId: id,
    };
  }
  static async getEmailVerificationRecord(
    verificationToken: string,
  ): Promise<Verification> {
    const result =
      await verificationHandler.getEmailVerificationRecord(
        verificationToken,
      );
    if (!result) {
      throw new Exception(
        ERROR_MESSAGES.AUTH.INVALID_EMAIL_VERIFICATION_TOKEN,
        STATUS_CODES.BAD_REQUEST,
      );
    }
    return result
  }
 
}
