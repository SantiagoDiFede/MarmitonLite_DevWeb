document.getElementById('signup-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    console.log('Données saisies :', { nom, prenom, email, password, confirmPassword });

    if (password !== confirmPassword) {
        alert('Les mots de passe ne correspondent pas.');
        return;
    }

    try {
        console.log('Envoi des données au backend...');
        const response = await fetch('http://localhost:3000/api/inscription', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nom, prenom, email, password }),
        });

        console.log('Réponse reçue :', response);

        if (response.ok) {
            const result = await response.json();
            console.log('Résultat du serveur :', result);
            alert('Inscription réussie ! Redirection vers l\'accueil...');
            window.location.href = 'index.html'; // Redirection après succès
        } else {
            const error = await response.json();
            console.error('Erreur renvoyée par le serveur :', error);
            alert(`Erreur : ${error.error}`);
        }
    } catch (error) {
        console.error('Erreur lors de l\'envoi des données :', error);
        alert('Une erreur interne est survenue.');
    }
});
