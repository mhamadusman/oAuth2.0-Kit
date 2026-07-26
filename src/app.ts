import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();
import morgan from "morgan";
import { Request, Response, NextFunction } from "express";
import express from "express";
import cookieParser from "cookie-parser";
import { router as authRoutes } from "./routes/authRoutes";
import { STATUS_CODES } from "./constants/statusCode.js";
import { Exception } from "./helpers/exception";
import helmet from "helmet";
import { ERROR_MESSAGES } from "./constants/errorMessages";


const app = express();
app.use(cookieParser());
const corsOptions = {
  origin: process.env.FRONT_END_URL, 
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

const apiPrefixV1 = "/api/v1";
app.use(`${apiPrefixV1}/auth`, authRoutes);
app.get('/favicon.ico', (req, res) => res.status(204).end());

//page not found
app.use((req: Request, res: Response, next: NextFunction) => {
  throw new Exception(
    ERROR_MESSAGES.SERVER.PAGE_NOT_FOUND,
    STATUS_CODES.NOT_FOUND,
  );
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.log(`original error :: `, error);
  if (error instanceof Exception) {
    if (error.errors && error.errors.length > 0) {
      return res.status(error.statusCode).json({
        message: error.message,
        errors: error.errors,
      });
    } else {
      return res.status(error.statusCode).json({
        message: error.message,
      });
    }
  }
  return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
    message: ERROR_MESSAGES.SERVER.INTERNAL_SERVER_ERROR,
  });
});

export default app;
