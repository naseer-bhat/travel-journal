import { Router } from "express";
import { login, register } from "../controllers/auth.js";
import { validate } from "../middleware/validate.js";
import {
  loginValidation,
  registerValidation,
} from "../validations/authValidation.js";
const router = Router();
router
  .post("/register", registerValidation, validate, register)
  .post("/login", loginValidation, validate, login);
export default router;
