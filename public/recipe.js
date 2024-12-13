// Fonction pour charger les jeux et les afficher
async function chargerRecette() {
    try {
        //get recipe id from url
        const urlParams = new URLSearchParams(window.location.search);
        const recipeId = urlParams.get('id');
        console.log(recipeId);
        //use recipe id
      const response = await fetch(
        "http://localhost:3000/api/recipes/recette/" + recipeId);
  if (!response.ok)
    throw new Error("Erreur lors de la récupération des données");

    const recette = await response.json();
    console.log(recette);
    const recetteDiv = document.querySelector("#recette");
    recetteDiv.innerHTML = `
        <h2>${recette.titre}</h2>
        <img src="${recette.image_path}" style="max-width: 100px;" />
        <p>${recette.description}</p>
        <p>${recette.ingredient}</p>
        <p>${recette.duree}</p>
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
      chargerRecette();
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
  