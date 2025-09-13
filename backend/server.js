import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import pool from "./db/index.js";


import authRoutes from "./routes/authRoute.js";
import expenseRoutes from "./routes/expenses.js";
import incomeRoutes from "./routes/incomes.js";
import categoryRoutes from "./routes/categories.js";
import summaryRoutes from "./routes/summary.js";
import userRoutes from "./routes/userRoute.js";
import receiptRoutes from "./routes/receipts.js";

import { authenticateToken } from "./middleware/authMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/expenses", authenticateToken, expenseRoutes);
app.use("/api/incomes", authenticateToken, incomeRoutes);
app.use("/api/categories", authenticateToken, categoryRoutes);
app.use("/api/summary", authenticateToken, summaryRoutes);
app.use("/api/user", authenticateToken, userRoutes);
app.use("/api/receipts", authenticateToken, receiptRoutes);

pool.query("SELECT NOW()")
  .then(() => console.log("Database is ready"))
  .catch((err) => console.error("DB connection error:", err));


app.get("/", (req, res) => {
  res.json({ message: "Personal Expense Tracker API" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
