import { createUserSchema } from "../zodSchemas/zod.createUserScheema";
import { loginSchema } from "../zodSchemas/zod.loginSchema";
import z from "zod"

export type creatUserDTO = z.infer<typeof createUserSchema>
export type loginUserDTO = z.Infer<typeof loginSchema>

export type loginResponse = {
    access_token: string,
    refresh_token: string
}

export interface INormalizedSocialProfile {
  email: string;
  providerId: string;
  name: string | null;
  profileImage: string | null;
  isEmailVerified: boolean;
  provider: string;
}

export interface SocialAccount {
  id: number;
  provider: string;
  providerId: string;
  createdAt: Date;
  updatedAt: Date
}

export interface UserWithSocialAccount {
  id: number;
  email: string;
  name: string;
  profileImage?: string;
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  accounts: SocialAccount[];
}

export interface SocialLoginResult {
  user: UserWithSocialAccount;
  created: boolean;
  accountCreated: boolean;
}