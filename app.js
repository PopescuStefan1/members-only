import express from "express";
import "dotenv/config";
import path from "path";
import session from "express-session";
import passport from "passport";
import authenticationRouter from "./routes/authenticationRouter.js";

const app = express();
app.use(express.static(path.join(import.meta.dirname, "public")));
app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");

app.use(session({ secret: "members-only", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(req.user);
  res.locals.currentUser = req.user;
  next();
});

app.use("/", authenticationRouter);

app.get("/", (req, res) => res.render("index"));
app.get("/login", (req, res) => res.render("login-form"));
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);
app.get("/membership", (req, res) => res.render("membership"));

app.listen(3000, () => console.log("app listening on port 3000!"));
