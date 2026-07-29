import { Sequelize } from "sequelize";
import { ERROR_MESSAGES } from "../constants/errorMessages.js";
import { Exception } from "../helpers/exception.js";
import { STATUS_CODES } from "../constants/statusCode.js";
import * as pg from "pg";

const connectionSTR = process.env.DATABASE_URL;
const inProduction = process.env.NODE_ENV === "production"
if (!connectionSTR) {
  throw new Exception(
    ERROR_MESSAGES.DATABASE.DB_CONNECTION_STRING_NOT_PRESENT,
    STATUS_CODES.INTERNAL_SERVER_ERROR,
  );
}

const sequelize = new Sequelize(connectionSTR, {
  dialect: "postgres",
  dialectModule: pg,
  logging: false,
  dialectOptions: inProduction
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : {},
  pool: {
    max: 10,
    min: 0, 
    acquire: 30000,
    idle: 10000,
  },
});

export default sequelize;
