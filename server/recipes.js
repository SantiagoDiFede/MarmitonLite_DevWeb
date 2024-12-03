const pool = require('./db');

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM recipes');
        res.json(result.rows); // Retourne les résultats sous forme de JSON
    } catch (err) {
        console.error('Erreur lors de la récupération des recettes :', err);
        res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
});

// Route : Ajouter une nouvelle recette
router.post('/', async (req, res) => {
    const { title, description, ingredients, steps, duration, difficulty, category, user_id } = req.body;

    if (!title || !description || !ingredients || !steps || !duration || !difficulty || !category || !user_id) {
        return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }

    try {
        const result = await pool.query(
            `INSERT INTO recipes (title, description, ingredients, steps, duration, difficulty, category, user_id) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [title, description, ingredients, steps, duration, difficulty, category, user_id]
        );
        res.status(201).json({ message: 'Recette ajoutée avec succès.', recipe: result.rows[0] });
    } catch (err) {
        console.error('Erreur lors de l\'ajout de la recette :', err);
        res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
});

// Route : Modifier une recette existante
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, ingredients, steps, duration, difficulty, category } = req.body;

    try {
        const result = await pool.query(
            `UPDATE recipes 
             SET title = $1, description = $2, ingredients = $3, steps = $4, duration = $5, difficulty = $6, category = $7
             WHERE id = $8 RETURNING *`,
            [title, description, ingredients, steps, duration, difficulty, category, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Recette non trouvée.' });
        }

        res.json({ message: 'Recette mise à jour avec succès.', recipe: result.rows[0] });
    } catch (err) {
        console.error('Erreur lors de la modification de la recette :', err);
        res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
});

// Route : Supprimer une recette
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM recipes WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Recette non trouvée.' });
        }

        res.json({ message: 'Recette supprimée avec succès.', recipe: result.rows[0] });
    } catch (err) {
        console.error('Erreur lors de la suppression de la recette :', err);
        res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
});

module.exports = router;
