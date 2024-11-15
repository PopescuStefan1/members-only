import express from "express";
import "dotenv/config";
import path from "path";
import session from "express-session";
import passport from "passport";
import authenticationRouter from "./routes/authenticationRouter.js";
import membershipRouter from "./routes/membershipRouter.js";
import messagesRouter from "./routes/messagesRouter.js";
import db from "./db/queries.js";

const app = express();
app.use(express.static(path.join(import.meta.dirname, "public")));
app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");

app.use(session({ secret: "members-only", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.locals.user = req.user;
  console.log(req.user);
  next();
});

app.use("/", authenticationRouter);
app.use("/membership", membershipRouter);
app.use("/messages", messagesRouter);

app.get("/", async (req, res) => {
  const messages = await db.getMessages();
  res.render("index", { messages: messages });
});

app.listen(3000, () => console.log("app listening on port 3000!"));
