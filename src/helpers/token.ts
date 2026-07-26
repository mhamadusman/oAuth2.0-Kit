import jwt from "jsonwebtoken";
import { Exception } from "./exception";
import { ERROR_MESSAGES } from "../constants/errorMessages";
import { STATUS_CODES } from "../constants/statusCode";
import { JwtPayload } from "jsonwebtoken";
import { Request, NextFunction } from "express";
import { Response } from "express";
declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}
export class token {
  static getAccessToken(id: number | undefined): string {
    if (!id) {
      throw new Exception(
        ERROR_MESSAGES.AUTH.UNAUTHORIZED,
        STATUS_CODES.UNAUTHORIZED,
      );
    }
    const access_secret_key = process.env.JWT_ACCESS_TOKEN_SECRET;
    if (!access_secret_key) {
      throw new Error(ERROR_MESSAGES.AUTH.ACCESS_SECRET_KEY);
    }
    const accessToken = jwt.sign({ id: id }, access_secret_key, {
      expiresIn: "15m",
    });
    return accessToken;
  }
  static getRefreshToken(id: number | undefined): string {
    if (!id) {
      throw new Exception(
        ERROR_MESSAGES.AUTH.UNAUTHORIZED,
        STATUS_CODES.UNAUTHORIZED,
      );
    }
    const secret = process.env.JWT_REFRESH_TOKEN_SECRET;
    const expiry = process.env.JWT_REFRESH_TOKEN_EXPIRY as any;
    if (!secret) {
      throw new Error(ERROR_MESSAGES.AUTH.REFRESH_KEY_NOT_PRESENT);
    }
    const refresTokn = jwt.sign({ id: id }, secret, {
      expiresIn: expiry,
    });
    return refresTokn;
  }
  static getPasswordResetToken(id: number): string {
    const reset_password_secret_key =
      process.env.JWT_RESET_PASSWORD_TOKEN_SECRET;
    if (!reset_password_secret_key) {
      throw new Error(ERROR_MESSAGES.AUTH.RESET_PASSWORD_KEY_IS_NOT_PRESENT);
    }
    const passwordResetToken = jwt.sign({ id: id }, reset_password_secret_key, {
      expiresIn: "5m",
    });
    return passwordResetToken;
  }
  static authenticate(
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    try {
      const authHeader = req.headers.authorization;
      const cookieToken = req.cookies?.auth_token;
      let token = cookieToken;

      if (!token && authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }

      if (!token) {
        throw new Exception(
          ERROR_MESSAGES.AUTH.UNAUTHORIZED,
          STATUS_CODES.UNAUTHORIZED,
        );
      }

      const access_secret_key = process.env.JWT_ACCESS_TOKEN_SECRET;
      if (!access_secret_key) {
        throw new Error(ERROR_MESSAGES.AUTH.ACCESS_SECRET_KEY);
      }

      const decoded = jwt.verify(token, access_secret_key) as JwtPayload;

      if (!decoded || typeof decoded.id !== "number") {
        throw new Exception(
          ERROR_MESSAGES.AUTH.UNAUTHORIZED,
          STATUS_CODES.UNAUTHORIZED,
        );
      }

      req.userId = decoded.id;
      next();
    } catch (error) {
      if (
        error instanceof jwt.JsonWebTokenError ||
        error instanceof jwt.TokenExpiredError
      ) {
        throw new Exception(
          ERROR_MESSAGES.AUTH.UNAUTHORIZED,
          STATUS_CODES.UNAUTHORIZED,
        );
      }
      throw error;
    }
  }
}
