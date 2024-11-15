import { Router } from "express";
import { signUp } from "../controllers/authenticationController.js";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import pool from "../db/pool.js";

const authenticationRouter = Router();

passport.use(
  new LocalStrategy({ usernameField: "email" }, async (username, password, done) => {
    try {
      const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [username]);
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect email" });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});

authenticationRouter.get("/");
authenticationRouter.get("/sign-up", (req, res) => res.render("sign-up-form"));
authenticationRouter.post("/sign-up", signUp);
authenticationRouter.get("/login", (req, res) => res.render("login-form"));
authenticationRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);
authenticationRouter.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

export default authenticationRouter;
