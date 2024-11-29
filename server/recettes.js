const pool = require('./db');

// Fonction pour récupérer tous les jeux
const getAllRecettes = async () => {
    const query = 'SELECT * FROM marmiton.recettes';
    const result = await pool.query(query);
    return result.rows;
};


module.exports = {
    getAllRecettes
};
