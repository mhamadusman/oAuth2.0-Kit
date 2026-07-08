import { Router } from "express";
import { authController } from "../controllers/authController";
import { validateRequestData } from "../middlewares/requestValidation";
import { createUserSchema } from "../zodSchemas/zod.createUserScheema";
import { loginSchema } from "../zodSchemas/zod.loginSchema";
import { validateIncomingParams } from "../middlewares/middleware.params.validation";
import { emailVerificationTokenSchema } from "../zodSchemas/zod.email.link.schema";
import { emailSchema } from "../zodSchemas/zod.email.schema";
import { verificationController } from "../controllers/verificationController/verificationController";
import { Authentication } from "../helpers/helpers.authentication";
import { passwordSchema } from "../zodSchemas/zod.password.schema";

export const router = Router();
router.post(
  "/sign-up",
  validateRequestData(createUserSchema),
  authController.signUp,
);
router.post("/login", validateRequestData(loginSchema), authController.login);
router.post("/log-out", authController.logOut);
router.post("/refresh-token", authController.refreshToken);
router.post(
  "/verify-email",
  validateIncomingParams(emailVerificationTokenSchema),
  verificationController.verifyEmailtoken,
);
router.post(
  "/forget-password",
  validateRequestData(emailSchema),
  verificationController.forgetPassword,
);
router.post(
  "/verify-password-reset-url",
  validateIncomingParams(emailVerificationTokenSchema),
  verificationController.verifyPasswordResetUrl,
);
router.post(
  "/reset-password",
  Authentication.authenticatePasswordResetToken(
    process.env.JWT_RESET_PASSWORD_TOKEN_SECRET!,
  ),
  validateRequestData(passwordSchema),
  authController.resetPassword,
);
