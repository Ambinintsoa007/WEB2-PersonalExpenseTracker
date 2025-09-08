import pool from '../db/index.js';

// Lister toutes les catégories d’un utilisateur
export const getCategories = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      "SELECT * FROM categories WHERE user_id = $1 OR is_default = true",
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Créer une nouvelle catégorie
export const createCategory = async (req, res) => {
  const userId = req.user.id;
  const { name, type } = req.body; // type: 'expense' ou 'income'

  try {
    const result = await pool.query(
      `INSERT INTO categories (user_id, name, type, created_at)
       VALUES ($1,$2,$3,NOW()) RETURNING *`,
      [userId, name, type]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Mettre à jour une catégorie
export const updateCategory = async (req, res) => {
  const userId = req.user.id;
  const categoryId = req.params.id;
  const { name, type } = req.body;

  try {
    const result = await pool.query(
      `UPDATE categories 
       SET name=$1, type=$2 
       WHERE id=$3 AND user_id=$4 RETURNING *`,
      [name, type, categoryId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Supprimer une catégorie
export const deleteCategory = async (req, res) => {
  const userId = req.user.id;
  const categoryId = req.params.id;

  try {
    const result = await pool.query(
      "DELETE FROM categories WHERE id=$1 AND user_id=$2 RETURNING *",
      [categoryId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json({ message: "Category deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
