import z from "zod";
import {
  userFields,
  userFieldsErrorMessages,
} from "../constants/userFields";

export const emailSchema = z
  .object({
    [userFields.EMAIL]: z
      .string({ message: userFieldsErrorMessages.EMAIL })
      .email({ message: userFieldsErrorMessages.EMAIL })
  })


