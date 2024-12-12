const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const recipesRoutes = require('./add_recipes');
const usersRoutes = require('./inscription');
const loginRoutes = require('./login');     


const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/api/recipes', recipesRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/login', loginRoutes);    
    
// Gestion des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Une erreur interne est survenue.' });
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
