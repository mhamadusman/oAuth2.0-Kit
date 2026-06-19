import morgan from "morgan";
import cors from "cors";
import { Request, Response, NextFunction } from "express";
import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
const app = express()
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan("dev"))

app.use("/", (req: Request , res: Response , next: NextFunction) => {
    console.log("hello world")
    return res.status(200).json({
        "message" : "ok"
    })
})

export default app 