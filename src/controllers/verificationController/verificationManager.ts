import { verificationHandler } from "../../handlers/verification.handler";
import { verificationUtil } from "../../utils/verification.util";
import { verification } from "../../types/type.verification";
import Verification from "../../models/verification.model";
import { userUtil } from "../../utils/user.util";
import User from "../../models/user.model";
export class verificationManager {
  static async createVerificationData(id: number): Promise<string> {
    const data: verification = verificationUtil.createVerificatonRecord(id);
    await verificationHandler.createVerifiactionRecord(data);
    //return only verification token
    return data.verificationToken;
  }
  static getVerificationUrl(token: string): string {
    return verificationUtil.generateEmailVerificationLink(token);
  }
  static async getEmailVerificationRecordAndRemove(token: string): Promise<number> {
    const verifiedRecord: Verification =
      await verificationUtil.getEmailVerificationRecord(token);
    const userId = verifiedRecord.userId;
    await this.removeEmailVerificationToken(verifiedRecord);
    return userId
  }
  static async removeEmailVerificationToken(
    verifiedRecord: Verification,
  ): Promise<void> {
    await verificationHandler.removeEmailVerificationToken(verifiedRecord);
  }
  static async verifyEmail(email: string): Promise<User>{
    return await userUtil.getUserByEmail(email)
  }
}
