import { verificationHandler } from "../../handlers/verification.handler";
import { verificationUtil } from "../../utils/verificationUtil";
import { verification } from "../../types/type.verification";

export class verificationManager{
    static async verifyEmailtoken(){

    }
    static async createVerificationData(id: number): Promise<string> {
        const data: verification = verificationUtil.createVerificatonRecord(id)
        await verificationHandler.createVerifiactionRecord(data)
        //return only verification link
        return data.verificationToken
    }
    static getVerificationUrl(token : string): string{
        const verificationLink = `http://localhost:5000/api/auth/verify-email?token=${token}`;
        return verificationLink
    }

}
    
