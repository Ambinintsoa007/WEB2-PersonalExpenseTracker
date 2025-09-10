import pool from '../db/index.js';

// Lister tous les revenus d’un utilisateur
export const getAllIncomes = async (req, res) => {
  const userId = req.user.id;
  const { start, end } = req.query;

  try {
    let query = "SELECT * FROM incomes WHERE user_id = $1";
    const params = [userId];

    if (start && end) {
      query += " AND date >= $2 AND date <= $3";
      params.push(start, end);
    }

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Récupérer un revenu par ID
export const getIncomeById = async (req, res) => {
  const userId = req.user.id;
  const incomeId = req.params.id;

  try {
    const result = await pool.query(
      "SELECT * FROM incomes WHERE id = $1 AND user_id = $2",
      [incomeId, userId]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Income not found" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Créer un revenu
export const createIncome = async (req, res) => {
  const userId = req.user.id;
  const { amount, date, source, description } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO incomes (user_id, amount, date, source, description, created_at)
       VALUES ($1,$2,$3,$4,$5,NOW()) RETURNING *`,
      [userId, amount, date, source, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Mettre à jour un revenu
export const updateIncome = async (req, res) => {
  const userId = req.user.id;
  const incomeId = req.params.id;
  const { amount, date, source, description } = req.body;

  try {
    const result = await pool.query(
      `UPDATE incomes SET amount=$1, date=$2, source=$3, description=$4
       WHERE id=$5 AND user_id=$6 RETURNING *`,
      [amount, date, source, description, incomeId, userId]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Income not found" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Supprimer un revenu
export const deleteIncome = async (req, res) => {
  const userId = req.user.id;
  const incomeId = req.params.id;

  try {
    const result = await pool.query(
      "DELETE FROM incomes WHERE id=$1 AND user_id=$2 RETURNING *",
      [incomeId, userId]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Income not found" });
    res.json({ message: "Income deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
