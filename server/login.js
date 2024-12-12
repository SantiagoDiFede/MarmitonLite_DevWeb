const express = require('express');
const router = express.Router();
const pool = require('./db'); // Connexion à PostgreSQL

// Route pour connecter un utilisateur
router.post('/', async (req, res) => {
    const { email, password } = req.body;

    // Vérification des champs requis
    if (!email || !password) {
        return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }

    try {
        // Recherche de l'utilisateur dans la base de données
        const query = 'SELECT * FROM Utilisateur WHERE email = $1';
        const result = await pool.query(query, [email]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Utilisateur non trouvé.' });
        }

        const user = result.rows[0];

        // Vérification du mot de passe
        if (user.password !== password) {
            return res.status(401).json({ error: 'Mot de passe incorrect.' });
        }

        // Connexion réussie
        res.status(200).json({ message: 'Connexion réussie.', user });
    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
});

module.exports = router;
