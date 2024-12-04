const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const recipesRoutes = require('./add_recipes');
const usersRoutes = require('./inscription');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/api/recipes', recipesRoutes);
app.use('/api/users', usersRoutes);

// Gestion des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Une erreur interne est survenue.' });
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
