import express from "express";
import bookmarkController from "../controllers/bookmark.controller.js";
import authentication from "../middleware/authentication.js";

const bookmark = express.Router();

bookmark.use(authentication);

bookmark.get("/", bookmarkController.getBookmarksByUserId);
bookmark.post("/", bookmarkController.addBookmarkToUser);
bookmark.put("/", bookmarkController.removeBookmarkFromUser);

export default bookmark;
