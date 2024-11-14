import bcrypt from "bcryptjs";
import db from "../db/queries.js";

export const signUp = async (req, res, next) => {
  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    if (err) {
      next(err);
    }

    try {
      db.signUp(req.body.email, hashedPassword, req.body.firstName, req.body.lastName);
      res.redirect("/");
    } catch (err) {
      return next(err);
    }
  });
};
