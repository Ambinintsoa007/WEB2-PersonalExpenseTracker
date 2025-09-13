import pool from '../db/index.js';

export const getMonthlySummary = async (req, res) => {
  const userId = req.user.id;
  const { month } = req.query;

  try {

    let query = `
      SELECT 
          DATE_TRUNC('month', date) AS month,
          SUM(CASE WHEN type='expense' THEN amount ELSE 0 END) AS total_expenses,
          SUM(CASE WHEN type='income' THEN amount ELSE 0 END) AS total_incomes,
          (SUM(CASE WHEN type='income' THEN amount ELSE 0 END) -
           SUM(CASE WHEN type='expense' THEN amount ELSE 0 END)) AS balance
      FROM (
          SELECT amount, date, 'expense' AS type
          FROM expenses
          WHERE user_id = $1
          UNION ALL
          SELECT amount, date, 'income' AS type
          FROM incomes
          WHERE user_id = $1
      ) t
    `;

    const params = [userId];


    if (month) {

      const regex = /^\d{4}-\d{2}$/;
      if (!regex.test(month)) {
        return res.status(400).json({ error: "Le paramètre 'month' doit être au format YYYY-MM" });
      }

      query += ` WHERE DATE_TRUNC('month', t.date) = TO_DATE($2, 'YYYY-MM') `;
      params.push(month);
    }

    query += ` GROUP BY month ORDER BY month DESC`;

    const result = await pool.query(query, params);

    res.json(result.rows);
  } catch (err) {
    console.error("Erreur summary :", err.message);
    res.status(500).json({ error: "Erreur serveur" });
  }
};



// Récupérer le résumé par intervalle de dates (start / end)
export const getSummaryByRange = async (req, res) => {
  const userId = req.user.id;
  const { start, end } = req.query;

  if (!start || !end) {
    return res.status(400).json({ error: "Start and end dates are required" });
  }

  try {
    const result = await pool.query(
      `SELECT 
          SUM(CASE WHEN type='expense' THEN amount ELSE 0 END) AS total_expenses,
          SUM(CASE WHEN type='income' THEN amount ELSE 0 END) AS total_incomes,
          (SUM(CASE WHEN type='income' THEN amount ELSE 0 END) -
           SUM(CASE WHEN type='expense' THEN amount ELSE 0 END)) AS balance
       FROM (
          SELECT amount, date, 'expense' AS type
          FROM expenses WHERE user_id = $1
          UNION ALL
          SELECT amount, date, 'income' AS type
          FROM incomes WHERE user_id = $1
       ) t
       WHERE date BETWEEN $2 AND $3`,
      [userId, start, end]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};


export const getAlerts = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      `SELECT 
          (SELECT COALESCE(SUM(amount),0) FROM incomes WHERE user_id=$1) AS total_incomes,
          (SELECT COALESCE(SUM(amount),0) FROM expenses WHERE user_id=$1) AS total_expenses`,
      [userId]
    );

    const { total_incomes, total_expenses } = result.rows[0];
    const balance = total_incomes - total_expenses;

    const alerts = [];

    if (total_expenses > total_incomes) {
      alerts.push(` Vos dépenses dépassent vos revenus de ${total_expenses - total_incomes} !`);
    }
    if (total_incomes === 0) {
      alerts.push(" Aucun revenu enregistré !");
    }
    if (total_expenses === 0) {
      alerts.push(" Aucune dépense enregistrée.");
    }

    res.json({ total_incomes, total_expenses, balance, alerts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};