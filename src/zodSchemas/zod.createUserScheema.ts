import z from "zod";
import {
  userFields,
  PASSWORD_RULES,
  userFieldsErrorMessages,
} from "../constants/userFields";

export const createUserSchema = z
  .object({
    [userFields.NAME]: z
      .string({ message: userFieldsErrorMessages.NAME })
      .trim()
      .min(1, userFieldsErrorMessages.NAME),

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
      ),

    [userFields.CONFIRM_PASSWORD]: z.string({
      message: userFieldsErrorMessages.PASSWORD_MISSING,
    }),
  })

  .superRefine((data, ctx) => {
    const password = data[userFields.PASSWORD];
    const confirmPassword = data[userFields.CONFIRM_PASSWORD];

    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: userFieldsErrorMessages.PASSWORD_MISMATCH,
        path: [userFields.CONFIRM_PASSWORD],
      });
    }
  });


