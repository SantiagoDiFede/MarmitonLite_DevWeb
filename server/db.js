const { Pool } = require('pg');

// Configuration de la connexion (chaîne par défaut)
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'admin',
    port: 5432
});

module.exports = pool;
