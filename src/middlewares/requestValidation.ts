import { Request, Response, NextFunction } from "express";
import { Exception } from "../helpers/exception";
import { STATUS_CODES } from "../constants/statusCode"
import { ZodObject } from "zod";
import { ValidationErrors } from "../types/type.validationErrors";

export const validateRequestData =  (schema: ZodObject) =>{
    const errors: ValidationErrors[] = []
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body)
        if(!result.success){
            result.error.issues.forEach((issue) =>{
                errors.push({
                    field: issue.path[0].toString(),
                    message: issue.message
                })
            })
            throw new Exception(errors, STATUS_CODES.BAD_REQUEST)
        }else{
            req.body = result.data
            next()
        }
    }
}