import express from "express";
import authController from "../controllers/auth.controller.js";

const auth = express.Router();

auth.post("/register", authController.register);
auth.post("/login", authController.login);
auth.get("/logout", authController.logout);
auth.get("/refresh", authController.checkRefreshToken);

export default auth;
