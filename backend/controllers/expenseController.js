import pool from "../db/index.js";
import fs from "fs";


//    Créer une dépense
export async function createExpense(req, res) {
  try {
    const {
      amount,
      description,
      category_id,
      date,
      is_recurring,
      start_date,
      end_date,
    } = req.body;

    if (!amount) {
      return res.status(400).json({ error: "Le montant est obligatoire" });
    }

    const receiptPath = req.file ? req.file.path : null;

    const result = await pool.query(
      `INSERT INTO expenses 
        (user_id, category_id, amount, description, date, is_recurring, receipt_path, start_date, end_date) 
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) 
       RETURNING *`,
      [
        req.user.id,
        category_id || null,
        amount,
        description || null,
        date || new Date(),
        is_recurring || false,
        receiptPath,
        start_date || null,
        end_date || null,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Impossible de créer la dépense" });
  }
}


//  Récupérer toutes les dépenses de l’utilisateur (option filtre par dates)
export async function getExpenses(req, res) {
  try {
    const { start_date, end_date } = req.query;
    let query = `SELECT * FROM expenses WHERE user_id = $1`;
    let values = [req.user.id];

    if (start_date && end_date) {
      query += ` AND date BETWEEN $2 AND $3`;
      values.push(start_date, end_date);
    }

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Impossible de récupérer les dépenses" });
  }
}

//  Récupérer une dépense par ID
export async function getExpenseById(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT * FROM expenses WHERE id=$1 AND user_id=$2`,
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Dépense non trouvée" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Impossible de récupérer la dépense" });
  }
}

//  Mettre à jour une dépense
export async function updateExpense(req, res) {
  try {
    const { id } = req.params;
    const {
      amount,
      description,
      category_id,
      date,
      is_recurring,
      start_date,
      end_date,
    } = req.body;

    const receiptPath = req.file ? req.file.path : null;

    const result = await pool.query(
      `UPDATE expenses 
       SET category_id=$1, amount=$2, description=$3, date=$4, 
           is_recurring=$5, receipt_path=COALESCE($6, receipt_path), 
           start_date=$7, end_date=$8
       WHERE id=$9 AND user_id=$10
       RETURNING *`,
      [
        category_id || null,
        amount,
        description || null,
        date || new Date(),
        is_recurring || false,
        receiptPath,
        start_date || null,
        end_date || null,
        id,
        req.user.id,
      ]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ error: "Dépense non trouvée ou non autorisée" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Impossible de mettre à jour la dépense" });
  }
}

//  Supprimer une dépense
export async function deleteExpense(req, res) {
  try {
    const { id } = req.params;

    // Récupérer la dépense avant suppression (pour supprimer le fichier reçu)
    const expense = await pool.query(
      `SELECT * FROM expenses WHERE id=$1 AND user_id=$2`,
      [id, req.user.id]
    );

    if (expense.rows.length === 0) {
      return res
        .status(404)
        .json({ error: "Dépense non trouvée ou non autorisée" });
    }

    // Supprimer le fichier reçu si existe
    if (expense.rows[0].receipt_path) {
      fs.unlink(expense.rows[0].receipt_path, (err) => {
        if (err) console.error("Erreur suppression fichier :", err);
      });
    }

    await pool.query(`DELETE FROM expenses WHERE id=$1 AND user_id=$2`, [
      id,
      req.user.id,
    ]);

    res.json({ message: "Dépense supprimée avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Impossible de supprimer la dépense" });
  }
}
