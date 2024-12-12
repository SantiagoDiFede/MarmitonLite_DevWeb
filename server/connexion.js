const express = require('express');
const router = express.Router();
const pool = require('./db'); // Connexion à la base PostgreSQL
const cookieParser = require('cookie-parser');

// Route pour connecter un utilisateur
router.post('/', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }

    try {
        // Rechercher l'utilisateur dans la base
        const userQuery = 'SELECT * FROM marmiton.utilisateur WHERE email = $1 AND password = $2';
        const userResult = await pool.query(userQuery, [email, password]);

        if (userResult.rows.length === 0) {
            return res.status(401).json({ error: 'Identifiants incorrects.' });
        }

        const user = userResult.rows[0];
        return res.status(200).json({ message: 'Connexion réussie.', user: user });
    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
});

// Route pour se déconnecter
router.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.status(200).json({ message: 'Déconnexion réussie.' });
    });
});

module.exports = router;
