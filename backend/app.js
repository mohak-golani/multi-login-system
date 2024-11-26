import express from "express";
import passport from "passport";
import session from "express-session";
import authRoutes from "./routes/auth.js";
import repoRoutes from "./routes/repo.js";
import cors from "cors";

const app = express();
const router = express.Router();
app.use(cors());

app.use(express.json());
app.use(
  session({
    secret: "87fa76c75b00ae938c174bad4ca37d59a6fbeffd",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRoutes);
app.use("/api", repoRoutes);

app.get("/", (req, res) => res.send("welcome to git management"));

app.get("/profile", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/auth/github");
  }
  res.json({
    message: "Welcome to your profile",
    provider: req.user.provider,
    user: req.user,
  });
});

app.listen(3000, () => {
  console.log("server running");
});
