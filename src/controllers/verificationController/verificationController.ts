import { Request, Response, NextFunction } from "express";
import { verificationManager } from "./verificationManager";
import { userHandler } from "../../handlers/user.handler";
import { STATUS_CODES } from "../../constants/statusCode";
import { token } from '../../helpers/token';

export class verificationController {
  static async verifyEmailtoken(
    req: Request<{ token: string }, { message: string }, {}>,
    res: Response<{ message: string }>,
    next: NextFunction,
  ) {
    try {
      const userId = await verificationManager.getEmailVerificationRecordAndRemove(
        req.query.token as string,
      )
      await userHandler.updateAccountStatus(userId)
      return res.status(STATUS_CODES.OK).json({
        message: "email verified"
      })
    } catch (error: unknown) {
      next(error);
    }
  }
}
