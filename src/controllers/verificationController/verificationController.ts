import { Request, Response, NextFunction } from "express";

export class verificationController {
  static async verifyEmailtoken(
    req: Request<{ token: string }, { message: string }, {}>,
    res: Response<{ message: string }>,
    next: NextFunction,
  ) {}
}
