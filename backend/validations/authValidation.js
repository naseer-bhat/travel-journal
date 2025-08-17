import { body } from "express-validator";
export const registerValidation = [
  body("email").isEmail().withMessage("Valid Email Required"),
  body("password").isStrongPassword().withMessage("password should be strong"),
];

export const loginValidation = [
  body("email").isEmail().withMessage("enter valid email"),
  body("password").notEmpty().withMessage("password required"),
];
