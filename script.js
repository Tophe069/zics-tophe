document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audio-player');
    const playlistElement = document.getElementById('playlist');
    const currentTrackTitleElement = document.getElementById('current-track-title');

    // --- Configuration de la Playlist ---
    // IMPORTANT : Remplacez les 'URL_VERS_VOTRE_MP3_X' par les VRAIS liens directs
    // vers vos fichiers MP3. Les liens Google Drive doivent être des liens de
    // téléchargement direct (uc?id=...&export=download) et le fichier doit
    // être partagé publiquement ("Tous les utilisateurs disposant du lien").
    // **Cette méthode avec Google Drive n'est PAS fiable pour le streaming.**
    // Il est FORTEMENT recommandé d'héberger vos MP3 ailleurs.
    const playlistData = [
        { title: "Votre Morceau 1", src: "URL_VERS_VOTRE_MP3_1" },
        { title: "Autre Chanson", src: "URL_VERS_VOTRE_MP3_2" },
        { title: "Musique Exemple 3", src: "URL_VERS_VOTRE_MP3_3" },
        // Ajoutez autant de morceaux que vous voulez ici
        // { title: "Titre", src: "URL_DIRECTE_MP3" },
    ];
    // -----------------------------------

    let currentTrackIndex = -1; // Commence à -1 pour indiquer qu'aucun morceau n'est chargé initialement
    let playlistItems = []; // Pour stocker les éléments <li> de la playlist

    // Fonction pour charger et jouer un morceau
    function loadTrack(index) {
        if (index < 0 || index >= playlistData.length) {
            console.error("Index de piste invalide :", index);
            return;
        }

        // Mettre à jour l'interface (enlever l'ancienne classe active, ajouter la nouvelle)
        if (currentTrackIndex !== -1 && playlistItems[currentTrackIndex]) {
            playlistItems[currentTrackIndex].classList.remove('active');
        }
        if (playlistItems[index]) {
             playlistItems[index].classList.add('active');
        }

        currentTrackIndex = index;
        const track = playlistData[currentTrackIndex];

        audioPlayer.src = track.src;
        currentTrackTitleElement.textContent = track.title;

        // Essayer de jouer le morceau
        // La lecture automatique peut être bloquée par les navigateurs
        audioPlayer.play().catch(error => {
            console.warn("La lecture automatique a été bloquée par le navigateur :", error);
            // Vous pourriez afficher un message à l'utilisateur ici
        });
    }

    // Fonction pour générer la playlist dans le HTML
    function renderPlaylist() {
        playlistElement.innerHTML = ''; // Vider la liste (enlève le placeholder "Chargement...")
        playlistItems = []; // Réinitialiser le tableau des éléments li

        if (playlistData.length === 0) {
             playlistElement.innerHTML = '<li class="loading-placeholder">Aucun morceau trouvé.</li>';
             return;
        }

        playlistData.forEach((track, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = track.title;
            listItem.dataset.index = index; // Stocker l'index dans un attribut data

            listItem.addEventListener('click', () => {
                loadTrack(index);
            });

            playlistElement.appendChild(listItem);
            playlistItems.push(listItem); // Ajouter l'élément créé au tableau
        });
    }

    // (Optionnel) Fonction pour jouer le morceau suivant automatiquement
    function playNextTrack() {
        let nextIndex = currentTrackIndex + 1;
        if (nextIndex >= playlistData.length) {
            nextIndex = 0; // Revenir au début si c'est la fin de la playlist
        }
        loadTrack(nextIndex);
    }

    // Écouter l'événement 'ended' pour passer au morceau suivant
    audioPlayer.addEventListener('ended', playNextTrack);

    // Initialisation : Générer la playlist au chargement de la page
    renderPlaylist();

    // Optionnel : Charger le premier morceau sans le jouer automatiquement
    if (playlistData.length > 0) {
       // Ne rien faire par défaut, l'utilisateur doit cliquer pour lancer
       // Ou si vous voulez charger le premier morceau sans le jouer :
       // currentTrackIndex = 0;
       // audioPlayer.src = playlistData[0].src;
       // currentTrackTitleElement.textContent = playlistData[0].title;
       // if (playlistItems[0]) playlistItems[0].classList.add('active');
    } else {
         currentTrackTitleElement.textContent = 'Playlist vide';
    }

});// Toggle du menu burger
document.getElementById("burger").addEventListener("click", () => {
  document.getElementById("main-nav").classList.toggle("show");
});
