document.addEventListener('DOMContentLoaded', function() {
    afficherDonnees();

    document.getElementById('ideaForm').addEventListener('submit', function(e) {
        e.preventDefault();

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
            desapprobations: 0,
            approuve: false
        };

        let idees = JSON.parse(localStorage.getItem('idees')) || [];
        idees.push(idee);
        localStorage.setItem('idees', JSON.stringify(idees));

        ajouterCarte(idee, idees.length - 1);
        document.getElementById('ideaForm').reset();
        afficherMessage('success');
    });
});

function ajouterCarte(idee, index) {
    let cardContainer = document.getElementById('cardContainer');
    let card = document.createElement('div');
    card.classList.add('card', 'mb-3', 'shadow-sm', 'rounded-lg');
    card.style.cursor = 'pointer';
    card.dataset.index = index;

    if (idee.approuve) {
        card.classList.add('approuve');
    } else if (idee.desapprobations > 0) {
        card.classList.add('desapprouve');
    }

    let cardBody = document.createElement('div');
    cardBody.classList.add('card-body', 'p-4');

    let cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title', 'mb-3', 'text-primary', 'font-semibold');
    cardTitle.textContent = idee.libelle;

    let cardCategory = document.createElement('p');
    cardCategory.classList.add('card-text', 'mb-2', 'text-sm', 'text-gray-600');
    cardCategory.textContent = `Catégorie: ${idee.categorie}`;

    let cardText = document.createElement('p');
    cardText.classList.add('card-text', 'mb-3', 'text-base', 'text-gray-800');
    cardText.textContent = idee.message;

    let buttonGroup = document.createElement('div');
    buttonGroup.classList.add('flex', 'gap-2', 'mt-4');

    let approveButton = document.createElement('button');
    approveButton.classList.add('button', 'bg-green-500', 'text-white', 'px-3', 'py-1', 'rounded-lg', 'hover:bg-green-600');
    approveButton.textContent = 'Approuver';
    approveButton.addEventListener('click', function() {
        idee.approbations++;
        idee.approuve = true;
        updateLocalStorage(index, idee);
        afficherDonnees();
    });

    let declineButton = document.createElement('button');
    declineButton.classList.add('button', 'bg-red-500', 'text-white', 'px-3', 'py-1', 'rounded-lg', 'hover:bg-red-600');
    declineButton.textContent = 'Désapprouver';
    declineButton.addEventListener('click', function() {
        idee.desapprobations++;
        idee.approuve = false;
        updateLocalStorage(index, idee);
        afficherDonnees();
    });
	let deleteButton = document.createElement('button');
    deleteButton.classList.add('icon-button', 'text-gray-600', 'hover:text-red-600');
    deleteButton.innerHTML = '<svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M19 6h-4.18l-1.45-1.45c-.18-.18-.44-.29-.71-.29h-3.72c-.27 0-.53.11-.71.29L9.18 6H5c-.55 0-1 .45-1 1s.45 1 1 1v12c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V8c.55 0 1-.45 1-1s-.45-1-1-1zm-7 10c0 .55-.45 1-1 1s-1-.45-1-1V10c0-.55.45-1 1-1s1 .45 1 1v6zm4 0c0 .55-.45 1-1 1s-1-.45-1-1V10c0-.55.45-1 1-1s1 .45 1 1v6z"/></svg>';
    
    // Ajout de la classe pour le style rouge à l'icône SVG
    deleteButton.querySelector('svg').classList.add('text-red-600', 'hover:text-red-800');

    deleteButton.addEventListener('click', function() {
        let idees = JSON.parse(localStorage.getItem('idees')) || [];
        idees.splice(index, 1);
        localStorage.setItem('idees', JSON.stringify(idees));
        afficherDonnees();
    });
// Ajout de la classe pour le style rouge à l'icône SVG
deleteButton.querySelector('svg').classList.add('text-red-600', 'hover:text-red-800');

	
    buttonGroup.appendChild(approveButton);
    buttonGroup.appendChild(declineButton);

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardCategory);
    cardBody.appendChild(cardText);
    cardBody.appendChild(buttonGroup);
    cardBody.appendChild(deleteButton);

    card.appendChild(cardBody);
    cardContainer.appendChild(card);
}

function afficherDonnees() {
    let cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = '';
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

function validateForm() {
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
