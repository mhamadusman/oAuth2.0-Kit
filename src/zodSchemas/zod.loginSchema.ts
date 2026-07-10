import z from "zod";
import {
  userFields,
  PASSWORD_RULES,
  userFieldsErrorMessages,
} from "../constants/userFields";

export const loginSchema = z
  .object({
    [userFields.EMAIL]: z
      .string({ message: userFieldsErrorMessages.WRONG_LOGIN_CREDENTIALS })
      .trim(),

    [userFields.PASSWORD]: z
      .string({ message: userFieldsErrorMessages.WRONG_LOGIN_CREDENTIALS })
      .min(PASSWORD_RULES.MIN_LENGTH, userFieldsErrorMessages.WRONG_LOGIN_CREDENTIALS)
      
  })


