import { createUserSchema } from "../zodSchemas/zod.createUserScheema";
import { loginSchema } from "../zodSchemas/zod.loginSchema";
import z from "zod"

export type creatUserDTO = z.infer<typeof createUserSchema>
export type loginUserDTO = z.Infer<typeof loginSchema>

export type loginResponse = {
    access_token: string,
    refresh_token: string
}
