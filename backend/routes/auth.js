import express from "express";
import passport from "passport";
import { Strategy as GithubStrategy } from "passport-github2";
import { Strategy as GitLabStrategy } from "passport-gitlab2";

const router = express.Router();

// github Strategy
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID || "Ov23liO5o8a0Sedaed9i",
      clientSecret:
        process.env.GITHUB_CLIENT_SECRET ||
        "87fa76c75b00ae938c174bad4ca37d59a6fbeffd",
      callbackURL: "http://localhost:3000/auth/github/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("GitHub Access Token:", accessToken);
      console.log("GitHub Profile:", profile);

      if (!accessToken) {
        return done(new Error("Failed to obtain access token"), null);
      }

      return done(null, { profile, accessToken, provider: "github" });
    }
  )
);

// gilab strategy
passport.use(
  new GitLabStrategy(
    {
      clientID:
        process.env.GITLAB_CLIENT_ID ||
        "3fb5d1cd6cecdc31c122f1d0d7b31f70ca282062c0a5c0453a9529cd9ec532cf",
      clientSecret:
        process.env.GITLAB_CLIENT_SECRET ||
        "gloas-9dcbd8124bc9b69fc3f2acc5724dab203f78456f0e4e1768e32a28def047c78a",
      callbackURL: "http://localhost:3000/auth/gitlab/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("GitLab Access Token:", accessToken);
      console.log("GitLab Profile:", profile);

      if (!accessToken) {
        return done(new Error("Failed to obtain access token"), null);
      }

      return done(null, { profile, accessToken, provider: "gitlab" });
    }
  )
);

// serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// github
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user", "repo"] })
);
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    console.log("GitHub Authentication successful. User:", req.user);
    res.redirect("/api/repos");
  }
);

// gitlab
router.get(
  "/gitlab",
  passport.authenticate(
    "gitlab",
    { scope: ["api"] },
    passport.authenticate("gitlab", { scope: ["read_user"] })
  )
);

router.get(
  "/gitlab/callback",
  passport.authenticate("gitlab", { failureRedirect: "/" }),
  (req, res) => {
    console.log("GitLab Authentication successful. User:", req.user);
    res.redirect("/api/repos");
  }
);

export default router;
