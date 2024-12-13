document
  .getElementById("login-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    // Récupération des données du formulaire
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        // Appel à l'API backend pour se connecter
        const response = await fetch('http://localhost:3000/api/connexion/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password}),
            credentials: 'include',
        });
        

        if (response.ok) {
            const result = await response.json();
            alert('Connexion réussie.');
            console.log('Utilisateur connecté :', result.user);
            document.cookie = 'userId=' + result.user.id_utilisateur;
            window.location.href = 'index.html';
        } else {
            const error = await response.json();
            document.getElementById('error-message').textContent = `Erreur : ${error.error}`;
            document.getElementById('error-message').style.display = 'block';
        }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  });
