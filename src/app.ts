import morgan from "morgan";
import cors from "cors";
import { Request, Response, NextFunction } from "express";
import express from "express";
import cookieParser from "cookie-parser";
import { router as authRoutes } from "./routes/authRoutes";
import { STATUS_CODES } from "./constants/statusCode.js"
import { Exception } from "./helpers/exception";
import helmet from "helmet";
import { ERROR_MESSAGES } from "./constants/errorMessages";
import { error } from "node:console";
const app = express()
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan("dev"))

const apiPrefixV1 = '/api/v1'
app.use(`${apiPrefixV1}/auth`, authRoutes)
//page not found 
app.use((req: Request , res: Response , next: NextFunction) => {
    throw new Exception(
        ERROR_MESSAGES.SERVER.PAGE_NOT_FOUND,
        STATUS_CODES.NOT_FOUND
    )
})

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    if(error instanceof Exception){
        return res.status(error.statusCode).json({
            messsage: error.message,
            errors: error.errors? error.errors : []
        })
    }
})

export default app 