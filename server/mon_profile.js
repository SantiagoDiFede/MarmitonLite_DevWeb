document.addEventListener('DOMContentLoaded', () => {
    const authSection = document.getElementById('auth-section');
    const profileOverview = document.getElementById('profile-overview');
    const editProfileFormSection = document.getElementById('edit-profile-form-section');
    const editProfileForm = document.getElementById('edit-profile-form');
    const profilePicture = document.getElementById('profile-picture');
    const profileName = document.getElementById('profile-name');
    const profileEmail = document.getElementById('profile-email');
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const deleteProfileBtn = document.getElementById('delete-profile-btn');
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');

    // Simule si l'utilisateur est connecté (en production, remplacez par un appel à l'API backend)
    let isUserLoggedIn = false;
    let userProfile = null;

    // Charger la page de connexion
    loginBtn.addEventListener('click', () => {
        alert("La page de connexion n'est pas encore implémentée.");
    });

    // Rediriger vers la page d'inscription
    signupBtn.addEventListener('click', () => {
        window.location.href = 'inscription.html';
    });

    // Charger le profil si l'utilisateur est connecté
    function loadProfile() {
        if (isUserLoggedIn && userProfile) {
            authSection.classList.add('hidden');
            profileOverview.classList.remove('hidden');
            profilePicture.src = userProfile.profilePicture || 'default-avatar.png';
            profileName.textContent = userProfile.name;
            profileEmail.textContent = userProfile.email;
        } else {
            authSection.classList.remove('hidden');
            profileOverview.classList.add('hidden');
        }
    }

    // Modifier le profil
    editProfileBtn.addEventListener('click', () => {
        editProfileFormSection.classList.remove('hidden');
        profileOverview.classList.add('hidden');
        editProfileForm.name.value = userProfile.name;
        editProfileForm.email.value = userProfile.email;
    });

    // Enregistrer les modifications du profil
    editProfileForm.addEventListener('submit', (event) => {
        event.preventDefault();
        userProfile.name = editProfileForm.name.value;
        userProfile.email = editProfileForm.email.value;

        const profilePictureUpload = document.getElementById('profile-picture-upload');
        if (profilePictureUpload.files.length > 0) {
            const file = profilePictureUpload.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                userProfile.profilePicture = e.target.result;
                loadProfile();
            };
            reader.readAsDataURL(file);
        } else {
            loadProfile();
        }

        editProfileFormSection.classList.add('hidden');
        profileOverview.classList.remove('hidden');
    });

    // Supprimer le profil
    deleteProfileBtn.addEventListener('click', () => {
        if (confirm('Êtes-vous sûr de vouloir supprimer votre profil ? Cette action est irréversible.')) {
            alert('Votre profil a été supprimé.');
            isUserLoggedIn = false;
            userProfile = null;
            loadProfile();
        }
    });

    // Charger les données utilisateur simulées
    function simulateUserLogin() {
        isUserLoggedIn = true;
        userProfile = {
            name: 'Jean Dupont',
            email: 'jean.dupont@example.com',
            profilePicture: 'default-avatar.png', // Simulation, peut être null
        };
        loadProfile();
    }

    // Simuler une connexion pour démo
    simulateUserLogin();
});
