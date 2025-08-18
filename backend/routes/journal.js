import { Router } from "express";
import {
  createJournal,
  deleteJournal,
  getAllJournal,
  getJournal,
  updateJournal,
} from "../controllers/journal";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  journalValidation,
  updateJournalValidation,
} from "../validations/journalValidation.js";
import { validate } from "../middleware/validate.js";
const router = Router();
router
  .post("/", authMiddleware, journalValidation, validate, createJournal)
  .get("/", getAllJournal)
  .get("/:id", getJournal)
  .put("/:id", authMiddleware, updateJournalValidation, validate, updateJournal)
  .delete("/:id", authMiddleware, deleteJournal);
