import { Strategy as GitHubStrategy } from "passport-github2";
import passport from "passport";

const strategyOptions = {
  clientID: process.env.GIT_HUB_CLIENT_ID || "",
  clientSecret: process.env.GIT_HUB_CLIENT_SECRET || "",
  callbackURL: process.env.GITHUB_CALLBACK_URL || "",
  scope: ["user:email"], 
};

passport.use(
  new GitHubStrategy(
    strategyOptions,
    async (accessToken: string, refreshToken: string, profile: any, done: any) => {
      try {
        return done(null, profile);
      } catch (error) {
        return done(error, null);
      }
    },
  ),
);
export default passport
