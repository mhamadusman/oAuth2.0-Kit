import { Request, Response, NextFunction } from "express";
import { verificationManager } from "./verificationManager";
import { userHandler } from "../../handlers/user.handler";
import { STATUS_CODES } from "../../constants/statusCode";
import { emailService } from "../../services/service.email";
import { SUCCESS_MESSAGES } from "../../constants/successMessages";
import { token } from "../../helpers/token";
import { Iemail } from "../../types/type.auth";

import {
  ACCESS_TOKEN_COOKIE_OPTIONS,
  REFRESH_TOKEN_COOKIE_OPTIONS,
  PASSWORD_RESET_COOKIE_OPTIONS
} from "../../config/cookie.config";

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
      const accessToken = token.getAccessToken(userId);
      const refreshToken = token.getRefreshToken(userId);
      res.cookie("auth_token", accessToken, ACCESS_TOKEN_COOKIE_OPTIONS);
      res.cookie("refresh_token", refreshToken, REFRESH_TOKEN_COOKIE_OPTIONS);
      return res.redirect(`${process.env.FRONT_END_URL}/dashboard`);
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
      const verificationURL = verificationManager.getVerificationUrl(
        verificationToken,
        "verify-password-reset-url",
      );
      const emailDetails: Iemail = {
        subject: "Verify your forget password link",
        link: verificationURL,
        message: "Click the button to verify link",
      };
      emailService.sendEmailVerificationLink(emailDetails, user.email);
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
      res.cookie("reset-password-token", passwordResetToken, PASSWORD_RESET_COOKIE_OPTIONS)
      res.redirect(`${process.env.FRONT_END_URL}/reset-password`);
    } catch (error: unknown) {
      next(error);
    }
  }
}
