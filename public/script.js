// Fonction pour charger les jeux et les afficher
async function chargerRecettes() {
    try {
        const response = await fetch('http://localhost:3000/api/recettes');
        if (!response.ok) throw new Error('Erreur lors de la récupération des données');

        const recettes = await response.json();
        const tableBody = document.querySelector('#recettes tbody');
        tableBody.innerHTML = '';

        recettes.forEach(jeu => {
        });
    } catch (error) {
        console.error(error);
    }
}
