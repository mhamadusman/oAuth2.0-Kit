import { Request, Response, NextFunction } from "express";
import Jwt, { JwtPayload } from "jsonwebtoken";
import { STATUS_CODES } from "../constants/statusCode";
import { ERROR_MESSAGES } from "../constants/errorMessages";
import User from "../models/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: User;
      resetUserId?: number;
    }
  }
}

interface myJwtType extends JwtPayload {
  userId: number;
}

export class Authentication {
  static authenticate(tokenName: string, tokenKey: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const authorization = req.headers.authorization;
      let token = authorization?.split(" ")[1];

      if (!token && req.cookies) {
        token = req.cookies?.[tokenName];
      }

      if (!token) {
        return res.status(STATUS_CODES.UNAUTHORIZED).json({
          message: ERROR_MESSAGES.AUTH.UNAUTHORIZED,
        });
      }

      try {
        const decoded = Jwt.verify(token, tokenKey) as myJwtType;
        req.user = { id: decoded.userId } as User;
        next();
      } catch (error: unknown) {
        return res.status(STATUS_CODES.UNAUTHORIZED).json({
          message: ERROR_MESSAGES.AUTH.UNAUTHORIZED,
        });
      }
    };
  }

  static authenticatePasswordResetToken(tokenKey: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
      let token
      if(req.cookies){
       token = req.cookies?.["reset-password-token"];
      }

      if (!token) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({
          message: ERROR_MESSAGES.AUTH.INVALID_RESET_PASSWORD_LINK,
        });
      }

      try {
        const decoded = Jwt.verify(token, tokenKey) as unknown as myJwtType;
        req.resetUserId = decoded.id;
        next();
      } catch (error: unknown) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({
          message: ERROR_MESSAGES.AUTH.UNAUTHORIZED,
        });
      }
    };
  }
}
