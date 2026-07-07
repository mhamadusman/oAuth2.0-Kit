import { verification } from "../types/type.verification";
import Verification from "../models/verification.model";
import { Op } from "sequelize";
export class verificationHandler {
  static async createVerifiactionRecord(data: verification): Promise<void> {
    await Verification.create({
      userId: data.userId,
      expiredAt: data.expiredAt,
      verificationToken: data.verificationToken,
    });
    return;
  }
  static async getEmailVerificationRecord(
    verificationToken: string,
  ): Promise<Verification | null> {
    const now = new Date();
    return Verification.findOne({
      where: {
        verificationToken: verificationToken,
        expiredAt: {
          [Op.gte]: now,
        },
      },
    });
  }
  static async removeEmailVerificationToken(
    verifiedRecord: Verification,
  ): Promise<void> {
    await verifiedRecord.destroy();
  }
}
