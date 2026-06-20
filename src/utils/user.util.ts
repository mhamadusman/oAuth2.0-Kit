import { ERROR_MESSAGES } from "../constants/errorMessages"
import { STATUS_CODES } from "../constants/statusCode"
import { userHandler } from "../handlers/user.handler"
import { Exception } from "../helpers/exception"
import User from "../models/user.model"
export class userUtil{
    static async verifyEmailRecod(email: string){
        const user: User | null = await userHandler.verifyEmailRecod(email)
        if(user){
           throw new Exception(ERROR_MESSAGES.AUTH.EMAIL_ALREADY_EXISTS , STATUS_CODES.CONFLICT)
        }
    }
}