import { StatusCode } from "../constants/statusCode.js";
import { ValidationErrors } from "../types/type.validationErrors.js";

export class Exception extends Error {
  public readonly statusCode: StatusCode;
  public readonly errors?: ValidationErrors[];

  constructor(message: string | ValidationErrors[], statusCode: StatusCode) {
    const baseMessage = Array.isArray(message) ? "Validatuon Error" : message;
    super(baseMessage);
    this.statusCode = statusCode;
    if(Array.isArray(message)){
        this.errors = message
    }
    Object.setPrototypeOf(this, Exception.prototype);
  }
}
