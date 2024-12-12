// Fonction pour charger les jeux et les afficher
async function chargerRecettes() {
    try {
        const response = await fetch('http://localhost:3000/api/recipes/recettesAndUsers');
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


//window on load
window.onload = () => {
    chargerRecettes();
    if(document.cookie){
        document.getElementById('login').style.display = 'none';
        document.getElementById('logout').style.display = 'block';
        document.getElementById('profile').style.display = 'block';
        document.getElementById('register').style.display = 'none';
        document.getElementById('addRecipe').style.display = 'block';
    } else {
        document.getElementById('login').style.display = 'block';
        document.getElementById('logout').style.display = 'none';
        document.getElementById('profile').style.display = 'none';
        document.getElementById('register').style.display = 'block';
        document.getElementById('addRecipe').style.display = 'none';
    }
}