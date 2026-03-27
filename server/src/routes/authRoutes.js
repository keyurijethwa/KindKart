import { Router } from "express";
import { register, login, logout } from "../controllers/authController.js";
import { validate } from "../middleware/validateMiddleware.js";
import { registerSchema, loginSchema } from "../schemas/authSchema.js";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/logout", logout);

export default router;
