// Fonction pour charger les jeux et les afficher
async function chargerRecettes() {
    try {
        const response = await fetch('http://localhost:3000/api/recettesAndUsers');
        if (!response.ok) throw new Error('Erreur lors de la récupération des données');

        const recettes = await response.json();
        console.log(recettes);
        const tableBody = document.querySelector('#recettes tbody');
        tableBody.innerHTML = '';

        recettes.forEach(recette => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${recette.titre}</td>
                <td>${recette.description}</td>
                <td>${recette.ingredient}</td>
                <td>${recette.duree}</td>
                <td>${recette.nom}  ${recette.prenom}</td>
                
            `;
            tableBody.appendChild(tr);
        });
    } catch (error) {
        console.error(error);
    }
}

async function chargerRecette(){
    try {
        const response = await fetch('http://localhost:3000/api/recette');
        if (!response.ok) throw new Error('Erreur lors de la récupération des données');

        const recette = await response.json();
        const tableBody = document.querySelector('#recette tbody');
        tableBody.innerHTML = '';

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${recette.titre}</td>
            <td>${recette.ingredient}</td>
            <td>${recette.description}</td>
            <td>${recette.stop}</td>
            <td>${recette.duree}</td>
        `;
        tableBody.appendChild(tr);
    }
    catch (error) {
        console.error(error);
    }
}

//window on load
window.onload = () => {
    chargerRecettes();
}