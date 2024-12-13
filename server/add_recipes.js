const pool = require('./db');
const express = require('express');
const app = express();
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM recipes');
        res.json(result.rows); // Retourne les résultats sous forme de JSON
    } catch (err) {
        console.error('Erreur lors de la récupération des recettes :', err);
        res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
});

//Route : Récupérer les recettes et les utilisateurs créateurs
router.get('/recettesAndUsers', async (req, res) => {
    try {
        const query = 'SELECT * from marmiton.recettes JOIN marmiton.utilisateur ON marmiton.recettes.id_utilisateur = marmiton.utilisateur.id_utilisateur';
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la récupération de la recette' });
    }
});

// Route : Ajouter une nouvelle recette
router.post('/addRecipe', async (req, res) => {
    console.log(req.body);
    console.log(res.headers);
    const { title, description, ingredients, steps, duration, category, user_id } = req.body;

    if (!title || !description || !ingredients || !steps || !duration || !category || !user_id) {
        return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }

    try {
        const query = `
            INSERT INTO marmiton.recettes (titre, ingredient, description, stop, duree, id_utilisateur,id_category )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
        `;
        const values = [title, ingredients, description, steps, duration, category, user_id];
        const result = await pool.query(query, values);

        res.status(201).json({ message: 'Recette ajoutée avec succès.', recipe: result.rows[0] });
    } catch (err) {
        console.error('Erreur lors de l\'ajout de la recette :', err);
        res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
});

module.exports = router;
