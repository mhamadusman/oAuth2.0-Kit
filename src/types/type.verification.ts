import Verification from "../models/verification.model";

export type verification = Pick<Verification , "userId" | "expiredAt" | "verificationToken">