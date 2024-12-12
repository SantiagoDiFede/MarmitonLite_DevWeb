const express = require('express');
const router = express.Router();
const pool = require('../db'); // Connexion à la base PostgreSQL

// Route : Ajouter une nouvelle recette
router.post('/', async (req, res) => {
    const { title, description, ingredients, steps, duration, difficulty, category, user_id } = req.body;

    if (!title || !description || !ingredients || !steps || !duration || !difficulty || !category || !user_id) {
        return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }

    try {
        const query = `
            INSERT INTO marmiton.recettes (titre, ingredient, description, stop, duree, id_difficulte, id_category, id_utilisateur)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
        `;
        const values = [title, ingredients, description, steps, duration, difficulty, category, user_id];
        const result = await pool.query(query, values);

        res.status(201).json({ message: 'Recette ajoutée avec succès.', recipe: result.rows[0] });
    } catch (err) {
        console.error('Erreur lors de l\'ajout de la recette :', err);
        res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
});

module.exports = router;
