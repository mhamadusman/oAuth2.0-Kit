import { Request, Response, NextFunction } from "express";
import { creatUserDTO, loginResponse, loginUserDTO } from "../types/type.auth";
import { STATUS_CODES } from "../constants/statusCode";
import { SUCCESS_MESSAGES } from "../constants/successMessages";
import { authManager } from "./authManager";
import { verificationManager } from "./verificationController/verificationManager";
import { emailService } from "../services/service.email";


export class authController {
  static async login(
    req: Request<{}, loginResponse, loginUserDTO>,
    res: Response<loginResponse>,
    next: NextFunction,
  ) {
    try {
      const data = await authManager.login(req.body);
      res.cookie("auth_token", data.access_token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 15 * 60 * 1000,
      });

      res.cookie("refresh_token", data.refresh_token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.status(STATUS_CODES.OK).json({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
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
      );
      await emailService.sendEmailVerificationLink(
        verificationURL,
        newUser.email,
      );
      return res.status(STATUS_CODES.CREATED).json({
        message: SUCCESS_MESSAGES.AUTH.USER_CREATED,
      });
    } catch (error: unknown) {
      next(error);
    }
  }
  static async logOut(req: Request, res: Response, next: NextFunction) {}
  static async refreshToken(req: Request, res: Response, next: NextFunction) {}
  static async resetPassword(
    req: Request<{}, { messaage: string }, { password: string }>,
    res: Response<{ message: string }>,
    next: NextFunction,
  ) {
    try {
     await authManager.resetPassword(Number(req.resetUserId) , req.body.password);
      return res.status(STATUS_CODES.OK).json({
        message: SUCCESS_MESSAGES.AUTH.PASSWORD_RESET_SUCCESSFUL,
      });
    } catch (error: unknown) {
      next(error);
    }
  }
}
