import { Router } from "express";
import { messagesCreateGet, messagesCreatePost } from "../controllers/messagesController.js";

const messagesRouter = Router();

messagesRouter.get("/create", messagesCreateGet);
messagesRouter.post("/create", messagesCreatePost);

export default messagesRouter;
