import bcrypt from "bcryptjs";
import db from "../db/queries.js";
import { body, validationResult } from "express-validator";

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 255 characters";

const signupValidate = [
  body("email")
    .trim()
    .escape()
    .normalizeEmail()
    .isEmail()
    .withMessage("Email must be a valid email")
    .isLength({ min: 1, max: 255 })
    .withMessage(`Email ${lengthErr}`),
  body("password")
    .trim()
    .escape()
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character."
    ),
  body("firstName")
    .trim()
    .escape()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 255 })
    .withMessage(`First name ${lengthErr}`),
  body("lastName")
    .trim()
    .escape()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 255 })
    .withMessage(`Last name ${lengthErr}`),
];

export const signUp = [
  signupValidate,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("sign-up-form", {
        errors: errors.array(),
      });
    }

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
  },
];
