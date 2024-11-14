import express from "express";
import "dotenv/config";
import path from "path";
import session from "express-session";
import passport from "passport";
import LocalStrategy from "passport-local";
import bcrypt from "bcryptjs";
import authenticationRouter from "./routes/authenticationRouter.js";
import db from "./db/queries.js";

const app = express();
app.set("views", path.join(import.meta.dirname, "views"));
app.use(express.static(path.join(import.meta.dirname, "public")));
app.set("view engine", "ejs");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
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

const userDetailsHandler = async (req, res, next) => {
  console.log(req.user);
  res.locals.user = req.user;
  res.locals.userDetails = await db.getUserDetails(req.user);
  next();
};

app.use(session({ secret: "members_only", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use(userDetailsHandler);

app.use("/auth", authenticationRouter);

app.get("/", (req, res) => res.render("index"));
app.get("/membership", (req, res) => res.render("membership"));

app.listen(3000, () => console.log("app listening on port 3000!"));
