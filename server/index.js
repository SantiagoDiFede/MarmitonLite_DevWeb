const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');

const recipesRoutes = require('./add_recipes'); // Import des routes pour les recettes
const inscriptionRoutes = require('./inscription');
const connexionRoutes = require('./connexion');


const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://127.0.0.1:5501', // Origine du frontend
    credentials: true,              // Si vous utilisez des cookies ou sessions
}));
app.use(
    session({
        secret: 'votre_clé_secrète', // Remplacez par une clé sécurisée
        resave: false,
        saveUninitialized: true,
    })
);

// Routes
app.use('/api/recipes', recipesRoutes);
app.use('/api/inscription', inscriptionRoutes);
app.use('/api/connexion', connexionRoutes);

// Gestion des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Une erreur interne est survenue.' });
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
