import express from "express";
import multer from "multer";
import { authenticateToken } from "../middleware/authMiddleware.js";
import {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
} from "../controllers/expenseController.js";

const router = express.Router();

// 📌 Config Multer pour upload de reçus
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // dossier "uploads/"
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Routes
router.post("/", authenticateToken, upload.single("receipt"), createExpense);
router.get("/", authenticateToken, getExpenses);
router.get("/:id", authenticateToken, getExpenseById);
router.put("/:id", authenticateToken, upload.single("receipt"), updateExpense);
router.delete("/:id", authenticateToken, deleteExpense);

export default router;

