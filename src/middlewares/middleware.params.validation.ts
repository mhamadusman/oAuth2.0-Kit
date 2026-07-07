import { Request, Response, NextFunction } from "express";
import { Exception } from "../helpers/exception";
import { STATUS_CODES } from "../constants/statusCode";
import { ZodObject, ZodError } from "zod";
import { ERROR_MESSAGES } from "../constants/errorMessages";


export const validateIncomingParams = (schema: ZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query);
    if (!result.success) {
        console.log("failed here")
      throw new Exception(
        ERROR_MESSAGES.AUTH.PROVIDE_VALID_EMAIL_VERIFICATION_TOKEN,
        STATUS_CODES.BAD_REQUEST,
      );
    }
    next()
  };
};
