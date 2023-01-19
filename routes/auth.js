import express from "express";
import { login, register, logout } from "../controllers/auth.js";
import { verifyUser } from "../utility/verifyToken.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", verifyUser, logout);

export default router;
