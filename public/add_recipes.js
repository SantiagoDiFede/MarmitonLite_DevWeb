document.getElementById('add-recipe-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    // Récupérer les données du formulaire
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const ingredients = document.getElementById('ingredients').value;
    const steps = document.getElementById('steps').value;
    const duration = document.getElementById('duration').value;
    const difficulty = document.getElementById('difficulty').value;
    const category = document.getElementById('category').value;
    const user_id = localStorage.getItem('user_id'); // Stockez l'ID utilisateur après connexion

    if (!user_id) {
        alert("Vous devez être connecté pour ajouter une recette.");
        return;
    }

    try {
        // Envoyer une requête POST à l'API
        const response = await fetch('/api/recipes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description, ingredients, steps, duration, difficulty, category, user_id }),
        });

        if (response.ok) {
            const result = await response.json();
            alert(result.message);
            window.location.href = 'index.html'; // Redirection vers la page d'accueil
        } else {
            const error = await response.json();
            alert(`Erreur : ${error.error}`);
        }
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la recette :', error);
        alert('Une erreur interne est survenue.');
    }
});
