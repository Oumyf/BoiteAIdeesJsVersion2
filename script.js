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
    card.style.cursor = 'pointer'; // Pour indiquer que c'est cliquable
    card.addEventListener('click', function() {
        afficherModale(idee, index);
    });

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

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardCategory);
    cardBody.appendChild(cardText);

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

function afficherModale(idee, index) {
    document.getElementById('modalTitle').textContent = idee.libelle;
    document.getElementById('modalBody').innerHTML = `
        <p>Catégorie: ${idee.categorie}</p>
        <p>${idee.message}</p>
        <p>Approbations: ${idee.approbations}</p>
        <p>Désapprobations: ${idee.desapprobations}</p>
    `;

    let modal = document.getElementById('modalContainer');
    modal.style.display = 'flex';

    document.getElementById('modalCloseButton').addEventListener('click', function() {
        modal.style.display = 'none';
    });

    document.getElementById('modalDeclineButton').addEventListener('click', function() {
        // Code pour refuser (par exemple, ajouter une désapprobation)
        idee.desapprobations++;
        updateLocalStorage(index, idee);
        afficherDonnees();
        modal.style.display = 'none';
    });

    document.getElementById('modalAcceptButton').addEventListener('click', function() {
        // Code pour accepter (par exemple, ajouter une approbation)
        idee.approbations++;
        updateLocalStorage(index, idee);
        afficherDonnees();
        modal.style.display = 'none';
    });
}

function updateLocalStorage(index, updatedIdee) {
    let idees = JSON.parse(localStorage.getItem('idees')) || [];
    idees[index] = updatedIdee;
    localStorage.setItem('idees', JSON.stringify(idees));
}

function validateForm() {
    // Vous pouvez ajouter des validations personnalisées ici si nécessaire
    return true; // Pour l'exemple, renvoie toujours true
}

function afficherMessage(type) {
    let messageBox = document.getElementById(`message-${type}`);
    if (messageBox) {
        messageBox.style.display = 'block';
        setTimeout(() => {
            messageBox.style.display = 'none';
        }, 3000);
    }
}
