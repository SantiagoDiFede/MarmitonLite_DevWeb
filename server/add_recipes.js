const pool = require("./db");
const express = require("express");
const app = express();
const router = express.Router();
const multer = require("multer");

//conf stockage des images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Dossier où les images seront stockées
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nom unique pour chaque image
  },
});

const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM recipes");
    res.json(result.rows); // Retourne les résultats sous forme de JSON
  } catch (err) {
    console.error("Erreur lors de la récupération des recettes :", err);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});

router.get("/recette/:id", async (req, res) => {
    const { id } = req.params;
    console.log(id);
    
    try {
        const result = await pool.query('SELECT * FROM marmiton.recettes WHERE id_utilisateur = $1', [id]);
    
        if (result.rows.length === 0) {
        return res.status(404).json({ error: "Recette non trouvée." });
        }
    
        res.json(result.rows[0]);
    } catch (err) {
        console.error("Erreur lors de la récupération de la recette :", err);
        res.status(500).json({ error: "Erreur interne du serveur." });
    }
    });


//Route : Récupérer les recettes et les utilisateurs créateurs
router.get("/recettesAndUsers", async (req, res) => {
  try {
    const query =
      "SELECT * from marmiton.recettes JOIN marmiton.utilisateur ON marmiton.recettes.id_utilisateur = marmiton.utilisateur.id_utilisateur";
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération de la recette" });
  }
});

// Route : Ajouter une nouvelle recette
router.post("/", upload.single("image"), async (req, res) => {
  const {
    title,
    image,
    description,
    ingredients,
    steps,
    duration,
    difficulty,
    category,
    user_id,
  } = req.body;

  if (
    !title ||
    !image ||
    !description ||
    !ingredients ||
    !steps ||
    !duration ||
    !difficulty ||
    !category ||
    !user_id
  ) {
    return res.status(400).json({ error: "Tous les champs sont requis." });
  }

  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const query = `
            INSERT INTO marmiton.recettes (titre, ingredient, description, stop, duree, id_difficulte, id_category, id_utilisateur)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *;
        `;
    const values = [
      title,
      image,
      ingredients,
      description,
      steps,
      duration,
      difficulty,
      category,
      user_id,
    ];
    const result = await pool.query(query, values);

    res.status(201).json({
      message: "Recette ajoutée avec succès.",
      recipe: result.rows[0],
    });
  } catch (err) {
    console.error("Erreur lors de l'ajout de la recette :", err);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});

module.exports = router;
