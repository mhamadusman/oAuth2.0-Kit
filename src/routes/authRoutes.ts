import { Router } from "express";
import { authController } from "../controllers/authController";

export const router = Router()
router.post("/sign-up" , authController.signUp)
router.post("/login" , authController.login) 
router.post("/log-out" , authController.logOut)
router.post("/refresh-token" , authController.refreshToken) 

