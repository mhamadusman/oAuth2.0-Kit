import { Request, Response, NextFunction } from "express";
import {
  creatUserDTO,
  Iemail,
  loginResponse,
  loginUserDTO,
  RefreshTokens,
} from "../types/type.auth";
import { STATUS_CODES } from "../constants/statusCode";
import { SUCCESS_MESSAGES } from "../constants/successMessages";
import { authManager } from "./authManager";
import { verificationManager } from "./verificationController/verificationManager";
import { emailService } from "../services/service.email";
import {
  ACCESS_TOKEN_COOKIE_OPTIONS,
  REFRESH_TOKEN_COOKIE_OPTIONS,
  CLEAR_COOKIE_OPTIONS,
} from "../config/cookie.config";
import { userHandler } from "../handlers/user.handler";

export class authController {
  static async login(
    req: Request<{}, loginUserDTO>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const data = await authManager.login(req.body);
      res.cookie("auth_token", data.access_token, ACCESS_TOKEN_COOKIE_OPTIONS);
      res.cookie(
        "refresh_token",
        data.refresh_token,
        REFRESH_TOKEN_COOKIE_OPTIONS,
      );
      return res.status(STATUS_CODES.OK).json({
        message: "welcome",
      });
    } catch (error: unknown) {
      next(error);
    }
  }
  static async signUp(
    req: Request<{}, { message: string }, creatUserDTO>,
    res: Response<{ message: string }>,
    next: NextFunction,
  ) {
    try {
      const newUser = await authManager.createUser(req.body);
      const emailVerificationToken =
        await verificationManager.createVerificationData(newUser.id);
      const verificationURL = verificationManager.getVerificationUrl(
        emailVerificationToken,
        "verify-email",
      );
      const emailDetails: Iemail = {
        subject: "Verify your email account",
        link: verificationURL,
        message: "Click the button to verify your email account",
      };
      await emailService.sendEmailVerificationLink(emailDetails, newUser.email);
      return res.status(STATUS_CODES.CREATED).json({
        message: SUCCESS_MESSAGES.AUTH.USER_CREATED,
      });
    } catch (error: unknown) {
      next(error);
    }
  }
  static async logOut(req: Request, res: Response, next: NextFunction) {
    try {
      await userHandler.updateRefreshToken("abc", Number(req.id));
      res.clearCookie("auth_token", CLEAR_COOKIE_OPTIONS);
      res.clearCookie("refresh_token", CLEAR_COOKIE_OPTIONS);
      return res.status(STATUS_CODES.OK).json({
        message: SUCCESS_MESSAGES.AUTH.LOGOUT_SUCCESSFUL,
      });
    } catch (error) {
      next(error);
    }
  }
  static async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const tokens: RefreshTokens = await authManager.refreshToken(
        Number(req.id),
      );
      res.cookie("auth_token", tokens.auth_token, ACCESS_TOKEN_COOKIE_OPTIONS);
      res.cookie(
        "refresh_token",
        tokens.refresh_token,
        REFRESH_TOKEN_COOKIE_OPTIONS,
      );
      return res.status(STATUS_CODES.OK).json({
        message: SUCCESS_MESSAGES.AUTH.TOKEN_REFRESHED,
      });
    } catch (error) {
      next(error);
    }
  }
  static async resetPassword(
    req: Request<{}, { messaage: string }, { password: string }>,
    res: Response<{ message: string }>,
    next: NextFunction,
  ) {
    try {
      await authManager.resetPassword(
        Number(req.resetUserId),
        req.body.password,
      );
      return res.status(STATUS_CODES.OK).json({
        message: SUCCESS_MESSAGES.AUTH.PASSWORD_RESET_SUCCESSFUL,
      });
    } catch (error: unknown) {
      next(error);
    }
  }
  static async signupWithGoogle(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userData = req.user as any;
      const result = await authManager.continueWithSocialProfile(userData);
      res.cookie("auth_token", result.auth_token, ACCESS_TOKEN_COOKIE_OPTIONS);
      res.cookie(
        "refresh_token",
        result.refresh_token,
        REFRESH_TOKEN_COOKIE_OPTIONS,
      );

      return res.redirect(`${process.env.FRONT_END_URL}/dashboard`);
    } catch (error: unknown) {
      next(error);
    }
  }
  static async userProfile(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("req.useer", req.id);

      const profile = await authManager.getUserProfile(Number(req.id));
      return res.status(STATUS_CODES.OK).json(profile);
    } catch (error) {
      next(error);
    }
  }
}
