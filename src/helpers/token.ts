import jwt from "jsonwebtoken";
import { Exception } from "./exception";
import { ERROR_MESSAGES } from "../constants/errorMessages";
import { STATUS_CODES } from "../constants/statusCode";
export class token {
  static  getAccessToken(id: number | undefined): string {
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
  static  getRefreshToken(id: number | undefined): string  {
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
}
