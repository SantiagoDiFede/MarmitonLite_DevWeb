const pool = require("./db");
const express = require("express");
const app = express();
const router = express.Router();

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const result = await pool.query('SELECT * FROM marmiton.utilisateur WHERE id_utilisateur = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Utilisateur non trouvé." });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error("Erreur lors de la récupération de l'utilisateur :", err);
        res.status(500).json({ error: "Erreur interne du serveur." });
    }
    });

module.exports = router;