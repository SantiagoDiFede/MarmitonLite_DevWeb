document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const result = await response.json();
            alert('Connexion réussie.');
            window.location.href = 'mon_profil.html'; // Rediriger vers la page du profil
        } else {
            const error = await response.json();
            const errorMessage = document.getElementById('error-message');
            errorMessage.textContent = `Erreur : ${error.error}`;
            errorMessage.style.display = 'block';
        }
    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        alert('Une erreur est survenue. Veuillez réessayer.');
    }
});
