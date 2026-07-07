import z from "zod";
import { ERROR_MESSAGES } from "../constants/errorMessages";
export const emailVerificationTokenSchema = z.object({
  token: z
    .string({ message: ERROR_MESSAGES.AUTH.INVALID_EMAIL_VERIFICATION_TOKEN })
    .trim()
    .min(1, { message: ERROR_MESSAGES.AUTH.INVALID_EMAIL_VERIFICATION_TOKEN }),
});
