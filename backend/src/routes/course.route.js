import express from "express";
import courseController from "../controllers/course.controller.js";
import authentication from "../middleware/authentication.js";
import { authorizationRole } from "../middleware/authorization.js";

const course = express.Router();

course.use(authentication);
course.get("/", courseController.getAllCourses);

course.use(authorizationRole(["ADMIN"]));
course.get("/:id", courseController.getCourseById);
course.post("/", courseController.createCourse);
course.put("/:id", courseController.updateCourse);
course.delete("/:id", courseController.deleteCourse);

export default course;
