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
app.use(cors());
app.use(
    session({
        secret: 'votre_secret', // Remplacez par une clé secrète sécurisée
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
