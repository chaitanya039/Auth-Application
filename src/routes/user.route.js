import { Router } from "express";
import validate from "../middlewares/validate.middleware.js";
import { loginSchema, registerSchema } from "../validators/auth.vaildate.js";
import { changeCurrentPassword, deleteProfile, getProfile, loginUser, registerUser, updateProfile } from "../controllers/user.controller.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";


// Create mini router
const router = Router();

// Create routes for users
router.route("/register").post(validate(registerSchema), registerUser);
router.route("/login").post(validate(loginSchema), loginUser);
router.route("/profile").get(jwtVerify, getProfile);
router.route("/profile").patch(jwtVerify, updateProfile);
router.route("/profile").delete(jwtVerify, deleteProfile);
router.route("/changepassword").patch(jwtVerify, changeCurrentPassword);

export default router;