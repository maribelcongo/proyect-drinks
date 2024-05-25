// buscar por nombre

 // barra busquedad nombre
function filterDrinks() {
    const option = document.getElementById('option').value;
    const searchInput = document.getElementById('searchInput');
    if (option === 'name') {
        searchInput.style.display = 'block';
    } else {
        searchInput.style.display = 'none';
    }
}

async function searchCocktail() {
    const option = document.getElementById('option').value;
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const main = document.getElementById('main');
    
    if (option === 'name' && searchInput) {
        try {
            const response = await fetch(baseUrl);
            const data = await response.json();
            const drink = data.find(item => item.name.toLowerCase() === searchInput);
            if (drink) {
                main.innerHTML = ''; // Clear previous results
                const card = createCard(drink);
                main.appendChild(card);
            } else {
                main.innerHTML = '<p>Cóctel no encontrado</p>';
            }
        } catch (error) {
            console.error('Error fetching the cocktail data:', error);
        }
    } else {
        alert('Seleccione la opción "Nombre" e ingrese un nombre válido.');
    }
}

function createCard(drink) {
    const card = document.createElement('div');
    card.className = 'card';

    const cardImage = document.createElement('img');
    cardImage.src = drink.image;
    cardImage.alt = drink.name;
    cardImage.className = 'card_img';

    const cardTextContainer = document.createElement('div');
    cardTextContainer.className = 'card_text_container';

    const cardTitle = document.createElement('h2');
    cardTitle.className = 'card_title';
    cardTitle.textContent = drink.name;

    const viewDetailButton = document.createElement('button');
    viewDetailButton.className = 'view_detail_btn';
    viewDetailButton.dataset.cardid = drink.id;
    viewDetailButton.textContent = 'Ver Detalle';
    viewDetailButton.onclick = () => viewDetail(drink.id);

    cardTextContainer.appendChild(cardTitle);
    cardTextContainer.appendChild(viewDetailButton);

    card.appendChild(cardImage);
    card.appendChild(cardTextContainer);

    return card;
}

function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.value = '';
    searchInput.style.display = 'none';
    document.getElementById('option').value = 'buscar';
    const main = document.getElementById('main');
    main.innerHTML = ''; // Clear the main section
}
