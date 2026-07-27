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
import googlepassport from "../config/config.passport";
import githubpassport from "../config/config.gitHub.passport";

export const router = Router();
router.post(
  "/sign-up",
  validateRequestData(createUserSchema),
  authController.signUp,
);
router.post("/login", validateRequestData(loginSchema), authController.login);
router.post(
  "/log-out",
  Authentication.authenticate(
    "auth_token",
    process.env.JWT_ACCESS_TOKEN_SECRET!,
  ),
  authController.logOut,
);
router.get(
  "/verify-email",
  validateIncomingParams(emailVerificationTokenSchema),
  verificationController.verifyEmailtoken,
);
router.post(
  "/forget-password",
  validateRequestData(emailSchema),
  verificationController.forgetPassword,
);
router.get(
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
router.get(
  "/google",
  googlepassport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
);
router.get(
  "/google/callback",
  googlepassport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  authController.signupWithGoogle,
);
router.get(
  "/github",
  githubpassport.authenticate("github", { scope: ["user:email"] }),
);

router.get(
  "/github/callback",
  githubpassport.authenticate("github", {
    failureRedirect: "/login",
    session: false,
  }),
  authController.signupWithGoogle,
);
router.get(
  "/me",
  Authentication.authenticate(
    "auth_token",
    process.env.JWT_ACCESS_TOKEN_SECRET as string,
  ),
  authController.userProfile,
);
router.post(
  "/refresh-token",
  Authentication.authenticate(
    "refresh_token",
    process.env.JWT_REFRESH_TOKEN_SECRET!,
  ),
  authController.refreshToken,
);
