import { Request, Response, NextFunction } from "express";
import { creatUserDTO } from "../types/type.auth";
import { Exception } from "../helpers/exception";
import { StatusCode } from '../constants/statusCode';
import { STATUS_CODES } from "../constants/statusCode";

export class authController {
  static async login(req: Request, res: Response, next: NextFunction) {}

  static async signUp(
    req: Request<{}, { message: string }, creatUserDTO>,
    res: Response<{message: string}>,
    next: NextFunction,
  ) {
    try{
      const userDetails = req.body
    }catch(error: unknown){
      next(error)
    }

  }
  static async logOut(req: Request, res: Response, next: NextFunction) {}
  static async refreshToken(req: Request, res: Response, next: NextFunction) {}
}
