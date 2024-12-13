// Fonction pour charger les jeux et les afficher
async function chargerProfil() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const profilId = urlParams.get('id');
      const response = await fetch(
        "http://localhost:3000/api/profil/" + profilId);
  if (!response.ok)
    throw new Error("Erreur lors de la récupération des données");

    const profil = await response.json();
    console.log(profil);
    const profilDiv = document.getElementById("profil");
    profilDiv.innerHTML = `
        <h2>${profil.nom}</h2>
        <h2>${profil.prenom}</h2>
        <h2>${profil.email}</h2>
        `;
    } catch (error) {
        console.error(error);
    }
}
  
  function logOut() {
      document.cookie = document.cookie + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      
  }
  
  // Add event listener to the <li> element
  document.getElementById('logout').addEventListener('click', () => {
      logOut();
      alert('Vous êtes déconnecté');	
  });
  
  //window on load
  window.onload = () => {
      chargerProfil();
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
  