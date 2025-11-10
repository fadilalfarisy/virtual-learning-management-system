import express from "express";
import user from "./user.route.js";
import reference from "./reference.route.js";
import course from "./course.route.js";
import auth from "./auth.route.js";
import bookmark from "./bookmark.route.js";
import { infoController } from "../controllers/info.controller.js";
import authentication from "../middleware/authentication.js";

const router = express.Router();

router.use("/auth", auth);
router.use("/users", user);
router.use("/courses", course);
router.use("/references", reference);
router.use("/bookmarks", bookmark);
router.get("/info/dashboard", authentication, infoController.getInfoDashboard);

export default router;
