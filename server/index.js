const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;
const cors = require('cors');
// Middleware

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));




app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", "true");  
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5501");  
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');  
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  

    if (req.method === 'OPTIONS') {
        return res.status(200).end();  // Respond immediately to OPTIONS requests
    }

    next();
});







const recipesRoutes = require('./add_recipes'); // Import des routes pour les recettes
const inscriptionRoutes = require('./inscription');
const connexionRoutes = require('./connexion');
const profileRoutes = require('./mon_profile');
app.use('/api/recipes', recipesRoutes);
app.use('/api/inscription', inscriptionRoutes);
app.use('/api/connexion', connexionRoutes);
app.use('/api/profil', profileRoutes);



// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Une erreur interne est survenue." });
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
