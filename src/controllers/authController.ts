import { Request, Response, NextFunction } from "express";
import { creatUserDTO } from "../types/type.auth";
import { STATUS_CODES } from '../constants/statusCode';
import { SUCCESS_MESSAGES } from "../constants/successMessages";

export class authController {
  static async login(req: Request, res: Response, next: NextFunction) {}

  static async signUp(
    req: Request<{}, { message: string }, creatUserDTO>,
    res: Response<{message: string}>,
    next: NextFunction,
  ) {
    try{
      
      return res.status(STATUS_CODES.OK).json({
        message: "ok"
      })
    }catch(error: unknown){
      next(error)
    }

  }
  static async logOut(req: Request, res: Response, next: NextFunction) {}
  static async refreshToken(req: Request, res: Response, next: NextFunction) {}
}
