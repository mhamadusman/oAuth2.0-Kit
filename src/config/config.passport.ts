import { Strategy as GoogleStrategy, Strategy } from "passport-google-oauth20";
import passport from "passport";

const strategyOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID || "",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  callbackURL: process.env.GOOGLE_CALLBACK_URL || "",
};
passport.use(
  new Strategy(
    strategyOptions,
    async (accessToken, refreshToken, profile, done) => {
        return  done(null , profile)
    },
  ),
);
export default passport
