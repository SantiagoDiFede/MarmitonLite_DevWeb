document.getElementById('signup-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    // Récupérer les données du formulaire
    const nom = document.getElementById('name').value;
    const prenom = "Exemple"; // Ajoutez un champ pour le prénom si nécessaire
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Validation des mots de passe
    if (password !== confirmPassword) {
        alert('Les mots de passe ne correspondent pas.');
        return;
    }

    try {
        // Envoyer une requête POST à l'API d'inscription
        const response = await fetch('/api/inscription', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nom, prenom, email, password }),
        });

        if (response.ok) {
            const result = await response.json();
            alert(result.message); // Afficher le message de succès
            window.location.href = 'index.html'; // Rediriger vers la page d'accueil
        } else {
            const error = await response.json();
            alert(`Erreur : ${error.error}`);
        }
    } catch (error) {
        console.error('Erreur lors de l\'inscription :', error);
        alert('Une erreur interne est survenue.');
    }
});
