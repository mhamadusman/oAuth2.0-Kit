import z from "zod";
import {
  userFields,
  PASSWORD_RULES,
  userFieldsErrorMessages,
} from "../constants/userFields";

export const loginSchema = z
  .object({
    [userFields.EMAIL]: z
      .string({ message: userFieldsErrorMessages.EMAIL })
      .email({ message: userFieldsErrorMessages.EMAIL }),

    [userFields.PASSWORD]: z
      .string({ message: userFieldsErrorMessages.PASSWORD_MISSING })
      .min(PASSWORD_RULES.MIN_LENGTH, userFieldsErrorMessages.PASSWORD_MIN)
      .regex(
        PASSWORD_RULES.UPPERCASE_REGEX,
        userFieldsErrorMessages.PASSWORD_UPPERCASE,
      )
      .regex(
        PASSWORD_RULES.LOWERCASE_REGEX,
        userFieldsErrorMessages.PASSWORD_LOWERCASE,
      )
      .regex(PASSWORD_RULES.DIGIT_REGEX, userFieldsErrorMessages.PASSWORD_DIGIT)
      .regex(
        PASSWORD_RULES.SPECIAL_CHAR_REGEX,
        userFieldsErrorMessages.PASSWORD_SPECIAL,
      )
  })


