import { Request, Response, NextFunction } from "express";
import { verificationManager } from "./verificationManager";
import { userHandler } from "../../handlers/user.handler";
import { STATUS_CODES } from "../../constants/statusCode";
import { emailService } from "../../services/service.email";
import { SUCCESS_MESSAGES } from "../../constants/successMessages";
import { token } from "../../helpers/token";

export class verificationController {
  static async verifyEmailtoken(
    req: Request<{ token: string }, { message: string }, {}>,
    res: Response<{ message: string }>,
    next: NextFunction,
  ) {
    try {
      const userId =
        await verificationManager.getEmailVerificationRecordAndRemove(
          req.query.token as string,
        );
      await userHandler.updateAccountStatus(userId);
      return res.status(STATUS_CODES.OK).json({
        message: "email verified",
      });
    } catch (error: unknown) {
      next(error);
    }
  }
  static async forgetPassword(
    req: Request<{}, { message: string }, { email: string }>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      //verify email from data base
      const user = await verificationManager.verifyEmail(req.body.email);
      //creat verification link and send back to user
      const verificationToken =
        await verificationManager.createVerificationData(user.id);
      const verificationURL =
        verificationManager.getVerificationUrl(verificationToken);
      emailService.sendEmailVerificationLink(verificationURL, user.email);
      return res.status(STATUS_CODES.OK).json({
        message: SUCCESS_MESSAGES.AUTH.VERIFICATION_LINK_SENT,
      });
    } catch (error: unknown) {
      next(error);
    }
  }
  static async verifyPasswordResetUrl(
    req: Request<{ token: string }, { message: string }, {}>,
    res: Response<{ message: string }>,
    next: NextFunction,
  ) {
    try {
      //validate token from db and remove it
      const userId =
        await verificationManager.getEmailVerificationRecordAndRemove(
          req.query.token as string,
        );
      //create short jwt
      const passwordResetToken = token.getPasswordResetToken(userId);
      res.cookie("reset-password-token", passwordResetToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 5 * 60 * 1000,
      });
      return res.status(STATUS_CODES.OK).json({
        message: SUCCESS_MESSAGES.AUTH.ENTER_NEW_PASSWORD,
      });
    } catch (error: unknown) {
      next(error);
    }
  }
}
