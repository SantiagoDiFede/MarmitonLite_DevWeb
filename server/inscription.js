const express = require('express');
const router = express.Router();
const pool = require('../db'); // Connexion à la base PostgreSQL

// Route pour inscrire un utilisateur
router.post('/', async (req, res) => {
    const { nom, prenom, email, password } = req.body;

    if (!nom || !prenom || !email || !password) {
        return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }

    try {
        // Vérifier si l'utilisateur existe déjà
        const userExistsQuery = 'SELECT * FROM marmiton.utilisateur WHERE email = $1';
        const userExistsResult = await pool.query(userExistsQuery, [email]);

        if (userExistsResult.rows.length > 0) {
            return res.status(400).json({ error: 'Cet email est déjà utilisé.' });
        }

        // Ajouter l'utilisateur
        const addUserQuery = `
            INSERT INTO marmiton.utilisateur (nom, prenom, email, password)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        const addUserValues = [nom, prenom, email, password];
        const newUser = await pool.query(addUserQuery, addUserValues);

        // Créer une session utilisateur après l'inscription
        req.session.user = {
            id: newUser.rows[0].id_utilisateur,
            nom: newUser.rows[0].nom,
            email: newUser.rows[0].email,
        };

        res.status(201).json({ message: 'Inscription réussie.', user: req.session.user });
    } catch (error) {
        console.error('Erreur lors de l\'inscription :', error);
        res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
});

module.exports = router;
