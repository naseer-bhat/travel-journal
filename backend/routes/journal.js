import { Router } from "express";
import {
  createJournal,
  deleteJournal,
  getAllJournal,
  getJournal,
  updateJournal,
} from "../controllers/journal";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = Router();
router
  .post("/", authMiddleware, createJournal)
  .get("/", getAllJournal)
  .get("/:id", getJournal)
  .put("/:id", authMiddleware, updateJournal)
  .delete("/:id", authMiddleware, deleteJournal);
export default router