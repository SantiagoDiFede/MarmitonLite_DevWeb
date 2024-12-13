const express = require('express');
const router = express.Router();
const pool = require('./db'); // Connexion à PostgreSQL

// Route d'inscription
router.post('/', async (req, res) => {
    const { nom, prenom, email, password } = req.body;

    if (!nom || !prenom || !email || !password) {
        return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }

    try {
        // Vérifier si l'email existe déjà
        const userExistsQuery = 'SELECT * FROM marmiton.utilisateur WHERE email = $1';
        const userExists = await pool.query(userExistsQuery, [email]);

        if (userExists.rows.length > 0) {
            return res.status(400).json({ error: 'Cet email est déjà utilisé.' });
        }

        // Ajouter le nouvel utilisateur
        const addUserQuery = `
    INSERT INTO marmiton.utilisateur (nom, prenom, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
`;
        const newUser = await pool.query(addUserQuery, [nom, prenom, email, password]);

        res.status(201).json({ message: 'Inscription réussie.', user: newUser.rows[0] });
    } catch (error) {
        console.error('Erreur lors de l\'inscription :', error);
        res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
});

module.exports = router;
