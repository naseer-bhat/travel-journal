import { body } from "express-validator";

export const journalValidation = [
  body("title")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long"),

  body("content")
    .isString()
    .isLength({ min: 10 })
    .withMessage("Content must be at least 10 characters long"),

  body("photos").optional().isURL().withMessage("Photo must be a valid URL"),

  body("location").isString().notEmpty().withMessage("Location is required"),
];
export const updateJournalValidation = [
  body("title").optional().isString().trim(),
  body("content").optional().isString().trim(),
  body("photos").optional().isURL().withMessage("Photos must be a valid URL"),
  body("location").optional().isString().trim(),
];
