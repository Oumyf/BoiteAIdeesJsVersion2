document.addEventListener('DOMContentLoaded', function() {
    afficherDonnees();

    document.getElementById('ideaForm').addEventListener('submit', function(e) {
        e.preventDefault(); // Empêcher l'envoi du formulaire par défaut

        if (!validateForm()) {
            afficherMessage('error');
            return;
        }

        let libelle = document.getElementById('libelle').value;
        let categorie = document.getElementById('categorie').value;
        let message = document.getElementById('message_descriptif').value;

        let idee = {
            libelle: libelle,
            categorie: categorie,
            message: message,
            approbations: 0,
            desapprobations: 0
        };

        // Stocker les données dans localStorage
        let idees = JSON.parse(localStorage.getItem('idees')) || [];
        idees.push(idee);
        localStorage.setItem('idees', JSON.stringify(idees));

        // Ajouter la nouvelle idée dans les cartes
        ajouterCarte(idee, idees.length - 1);

        // Réinitialiser le formulaire
        document.getElementById('ideaForm').reset();

        afficherMessage('success');
    });
});

function ajouterCarte(idee, index) {
    let cardContainer = document.getElementById('cardContainer');

    let card = document.createElement('div');
    card.classList.add('card', 'mb-3', 'shadow-sm');

    let cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    let cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title', 'mb-3');
    cardTitle.textContent = idee.libelle;

    let cardCategory = document.createElement('p');
    cardCategory.classList.add('card-text', 'mb-2', 'text-muted');
    cardCategory.textContent = `Catégorie: ${idee.categorie}`;

    let cardText = document.createElement('p');
    cardText.classList.add('card-text', 'mb-3');
    cardText.textContent = idee.message;

    let approbationButton = document.createElement('button');
    approbationButton.textContent = 'Approuver';
    approbationButton.classList.add('btn', 'btn-success', 'mr-2');
    approbationButton.addEventListener('click', function() {
        idee.approbations++;
        updateLocalStorage(index, idee);
        afficherDonnees(); // Mettre à jour l'affichage des cartes
    });

    let desapprobationButton = document.createElement('button');
    desapprobationButton.textContent = 'Désapprouver';
    desapprobationButton.classList.add('btn', 'btn-danger', 'mr-2');
    desapprobationButton.addEventListener('click', function() {
        idee.desapprobations++;
        updateLocalStorage(index, idee);
        afficherDonnees(); // Mettre à jour l'affichage des cartes
    });

    let suppressionButton = document.createElement('button');
    suppressionButton.textContent = 'Supprimer';
    suppressionButton.classList.add('btn', 'btn-warning');
    suppressionButton.addEventListener('click', function() {
        supprimerIdee(index);
    });

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardCategory);
    cardBody.appendChild(cardText);
    cardBody.appendChild(approbationButton);
    cardBody.appendChild(desapprobationButton);
    cardBody.appendChild(suppressionButton);

    card.appendChild(cardBody);
    cardContainer.appendChild(card);
}

function afficherDonnees() {
    let cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = ''; // Effacer les cartes existantes
    let idees = JSON.parse(localStorage.getItem('idees')) || [];

    idees.forEach(function(idee, index) {
        ajouterCarte(idee, index);
    });
}

function updateLocalStorage(index, updatedIdee) {
    let idees = JSON.parse(localStorage.getItem('idees')) || [];
    idees[index] = updatedIdee;
    localStorage.setItem('idees', JSON.stringify(idees));
}

function supprimerIdee(index) {
    let idees = JSON.parse(localStorage.getItem('idees')) || [];
    idees.splice(index, 1);
    localStorage.setItem('idees', JSON.stringify(idees));
    afficherDonnees();
}

function afficherMessage(type) {
    let messageBox = document.getElementById(`message-${type}`);
    if (messageBox) {
        messageBox.style.display = 'block';

        setTimeout(function() {
            messageBox.style.display = 'none';
        }, 3000); // Le message disparaît après 3 secondes
    }
}

function validateForm() {
    // Vous pouvez ajouter des validations personnalisées ici si nécessaire
    return true; // Pour l'exemple, renvoie toujours true
}
