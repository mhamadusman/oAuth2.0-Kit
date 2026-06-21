import { Router } from "express";
import { authController } from "../controllers/authController";
import { validateRequestData } from "../middlewares/requestValidation";
import { createUserSchema } from "../zodSchemas/zod.createUserScheema";
import { loginSchema } from "../zodSchemas/zod.loginSchema";

export const router = Router()
router.post("/sign-up", validateRequestData(createUserSchema),  authController.signUp)
router.post("/login" , validateRequestData(loginSchema), authController.login) 
router.post("/log-out" , authController.logOut)
router.post("/refresh-token" , authController.refreshToken) 

