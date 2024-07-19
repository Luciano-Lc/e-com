import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  logoutUser,
} from "../controllers/userController.js";

// Public Routes

router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.route("/").post(registerUser);

export { router as UserRouter };
