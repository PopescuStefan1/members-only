import { Router } from "express";
import { signUp } from "../controllers/authenticationController.js";

const authenticationRouter = Router();

authenticationRouter.get("/");

authenticationRouter.get("/sign-up", (req, res) => res.render("sign-up-form"));

authenticationRouter.post("/sign-up", signUp);

// authenticationRouter.post(
//   "/log-in",
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/",
//   })
// );

// authenticationRouter.get("/log-out", (req, res, next) => {
//   req.logout((err) => {
//     if (err) {
//       return next(err);
//     }
//     res.redirect("/");
//   });
// });

export default authenticationRouter;
