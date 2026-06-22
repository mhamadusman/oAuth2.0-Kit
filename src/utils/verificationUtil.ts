import crypto from "crypto";
import { verification } from "../types/type.verification";
export class verificationUtil {
  static async verificationUtil(token: string) {}
  static generateEmailVerificationLink(): string {
    return "d";
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
      userId: id
    };
  }
}
