const container = document.getElementById("container");
const baseUrl = "https://66258e07052332d5532047d6.mockapi.io/drinks/cocteles";

const crearCoctelBtn = document.getElementById("crearCoctelBtn");
const coctelContainer = document.getElementById("coctelContainer");
const loader = document.getElementById("loader");

// Función get para traer los elementos y mostrarlos
const getDrinks = (fetchUrl) => {
  loader.style.display = "block";
  container.style.display = "none";

  fetch(fetchUrl)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }
      return res.json();
    })
    .then((data) => {
      container.innerHTML = ""; // Limpiar el contenedor

      data.forEach((drink) => {
        const { id, name, image } = drink;
        container.innerHTML += `
          <div class="card">
            <img
              src="${image}"
              alt="${name}"
              class="card_img"
            />
            <div class="card_text_container">
              <h2 class="card_title">${name}</h2>
              <button class="view_detail_btn" data-cardid="${id}" onclick="viewDetail(${id})">Ver Detalle</button>
            </div>
          </div>
        `;
      });
    })
    .catch((err) => {
      console.error("Error fetching drinks:", err);
    })
    .finally(() => {
      setTimeout(() => {
        loader.style.display = "none";
        container.style.display = "flex";
      }, 2000);
    });
};

// Llamar a la función para obtener los cócteles al cargar la página
getDrinks(baseUrl);
