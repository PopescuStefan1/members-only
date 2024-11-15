import { body, validationResult } from "express-validator";
import db from "../db/queries.js";

const lengthErr = "must be between 1 and 255 characters";

const messageValidate = [
  body("title").trim().escape().isLength({ min: 1, max: 255 }).withMessage(`Title ${lengthErr}`),
  body("text").trim().escape().isLength({ min: 1, max: 255 }).withMessage(`Message ${lengthErr}`),
];

export const messagesCreateGet = (req, res) => res.render("create-message");

export const messagesCreatePost = [
  messageValidate,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("create-message", {
        errors: errors.array(),
      });
    }

    await db.createMessage(req.body.title, req.body.text, new Date(), req.user.id);
    res.redirect("/");
  },
];
