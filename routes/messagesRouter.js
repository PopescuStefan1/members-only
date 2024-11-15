import { Router } from "express";
import { messagesCreateGet, messagesCreatePost, messagesDeletePost } from "../controllers/messagesController.js";

const messagesRouter = Router();

messagesRouter.get("/create", messagesCreateGet);
messagesRouter.post("/create", messagesCreatePost);
messagesRouter.post("/delete/:id", messagesDeletePost);

export default messagesRouter;
