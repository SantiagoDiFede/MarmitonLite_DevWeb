const express = require('express');
const games = require('./recettes');
const app = express();
const PORT = 3000;
var bodyParser = require('body-parser')


app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// Middleware pour CORS (permet à la page web de faire des requêtes au serveur)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    next();
});





// Route pour récupérer tous les jeux
app.get('/api/recettes', async (req, res) => {
    try {
        const allRecettes = await recettes.getAllRecettes();
        res.json(allRecettes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la récupération des jeux' });
    }
});



app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
