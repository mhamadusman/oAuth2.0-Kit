import { createUserSchema } from "../zodSchemas/zod.createUserScheema";
import z from "zod"

export type creatUserDTO = z.infer<typeof createUserSchema>