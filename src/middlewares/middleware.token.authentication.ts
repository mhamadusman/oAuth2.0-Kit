import { Request, Response, NextFunction } from "express";
import { ERROR_MESSAGES } from "../constants/errorMessages";
import { STATUS_CODES } from "../constants/statusCode";
import Jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user.model";
import { userUtil } from "../utils/user.util";
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

interface myJwtType extends JwtPayload {
  userId: number;
}

export const authenticate = (tokenName: string, tokenKey: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;
    let token = authorization?.split(" ")[1];
    if (!token && req.cookies) {
      token = req.cookies?.tokenName;
    }
    if (!token) {
      return res.status(STATUS_CODES.UNAUTHORIZED).json({
        message: ERROR_MESSAGES.AUTH.UNAUTHORIZED,
      });
    }
    try {
      const decode = Jwt.verify(token, tokenKey) as myJwtType;
      const id = decode.id;
      //const user = await userUtil.getUserById(id)
      //req.user = user
      next();
    } catch (error: unknown) {
      return res.status(STATUS_CODES.UNAUTHORIZED).json({
        message: ERROR_MESSAGES.AUTH.UNAUTHORIZED,
      });
    }
  };
};
