import path from "path";
import fs from "fs";
import pool from "../db/index.js";
import { fileURLToPath } from "url";



// Pour reconstituer  en ESM


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Télécharger ou voir un reçu


export const getReceipt = async (req, res) => {
  const userId = req.user.id;
  const expenseId = req.params.idExpense;

  try {
    const expenseRes = await pool.query(
      "SELECT receipt_path FROM expenses WHERE id=$1 AND user_id=$2",
      [expenseId, userId]
    );

    if (expenseRes.rows.length === 0) {
      return res.status(404).json({ error: "Expense not found" });
    }

    const receiptPath = expenseRes.rows[0].receipt_path;
    if (!receiptPath) {
      return res.status(404).json({ error: "No receipt uploaded for this expense" });
    }

    const fullPath = path.join(__dirname, "..", receiptPath);
    if (!fs.existsSync(fullPath)) {
      return res.status(404).json({ error: "Receipt file not found on server" });
    }

    res.sendFile(fullPath);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Placeholder pour upload (sera complété plus tard)
export const uploadReceipt = async (req, res) => {
  res.status(501).json({ message: "Upload not implemented yet" });
};



