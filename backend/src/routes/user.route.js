import express from "express";
import userController from "../controllers/user.controller.js";
import authentication from "../middleware/authentication.js";
import { authorizationRole } from "../middleware/authorization.js";

const user = express.Router();

user.use(authentication);
user.use(authorizationRole(["ADMIN"]));

user.get("/", userController.getAllUsers);
user.get("/:id", userController.getUserById);
user.post("/", userController.createUser);
user.put("/:id", userController.updateUser);
user.delete("/:id", userController.deleteUser);

export default user;
