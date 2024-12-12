const pool = require('./db'); // Connexion à la base de données
const express = require('express');
const router = express.Router();


// Fonction pour ajouter un nouvel utilisateur
const addUser = async (nom,prenom, email, password) => {
    try {
        const query = `
            INSERT INTO marmiton.utilisateur (nom, prenom, email, password, created_at)
            VALUES ($1, $2, $3, $4)
            RETURNING *`;
        const values = [nom,prenom, email, password];
        const result = await pool.query(query, values);
        return result.rows[0]; // Retourne l'utilisateur nouvellement créé
    } catch (error) {
        console.error('Erreur lors de l\'ajout d\'un utilisateur :', error);
        throw error;
    }
};

// Fonction pour vérifier si un utilisateur existe déjà (par email)
const checkUserExists = async (email) => {
    try {
        const query = 'SELECT * FROM marmiton.users WHERE email = $1';
        const result = await pool.query(query, [email]);
        return result.rows.length > 0; // Retourne true si l'utilisateur existe
    } catch (error) {
        console.error('Erreur lors de la vérification de l\'utilisateur :', error);
        throw error;
    }
};

module.exports = {
    addUser,
    checkUserExists,
};
