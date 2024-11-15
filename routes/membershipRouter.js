import { Router } from "express";
import { membershipGet, membershipPost } from "../controllers/membershipController.js";

const membershipRouter = Router();

membershipRouter.get("/", membershipGet);
membershipRouter.get("/:error", membershipGet);
membershipRouter.post("/", membershipPost);

export default membershipRouter;
