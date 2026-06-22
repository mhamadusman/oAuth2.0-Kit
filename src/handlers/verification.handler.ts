import { verification } from "../types/type.verification"
import Verification from "../models/verification.model"
export class verificationHandler{
    static async createVerifiactionRecord(data: verification): Promise<void>{
        await Verification.create({
            userId: data.userId,
            expiredAt: data.expiredAt,
            verificationToken: data.verificationToken
        })
        return 
    }
}