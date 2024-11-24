function filterDrinks() {
  const option = document.getElementById("option").value;
  const searchInput = document.getElementById("searchInput");
  const searchIngredient = document.getElementById("searchIngredient");

  // Muestra el campo de búsqueda correspondiente y oculta el otro
  if (option === "name") {
    searchInput.style.display = "block";
    searchIngredient.style.display = "none";
  } else if (option === "ingredients") {
    searchInput.style.display = "none";
    searchIngredient.style.display = "block";
  } else {
    searchInput.style.display = "none";
    searchIngredient.style.display = "none";
  }
}

function searchCocktail() {
  const option = document.getElementById("option").value;
  const searchValue =
    option === "name"
      ? document.getElementById("searchInput").value
      : document.getElementById("searchIngredient").value;

  let fetchUrl = baseUrl;

  // Si hay un valor en el campo de búsqueda, modifica la URL
  if (searchValue) {
    fetchUrl += `?${option}=${encodeURIComponent(searchValue)}`;
  }

  // Mostrar solo el cargador y ocultar lo que esté visible
  document.getElementById("container").style.display = "none";
  document.getElementById("detail-container").style.display = "none";
  loader.style.display = "block";

  // Llamar a la función getDrinks con la URL actualizada y mostrar el botón "Volver"
  getDrinks(fetchUrl, true);
}
// Esta función se llama cuando se vuelve a la página de inicio
function goBackToHome() {
  getDrinks(baseUrl, false);
  document.getElementById("searchInput").value = "";
  document.getElementById("searchIngredient").value = "";
  document.getElementById("option").value = "buscar";
  filterDrinks();
}

// Esta función limpia los valores de búsqueda
function clearSearch() {
  const searchInput = document.getElementById("searchInput");
  const searchIngredient = document.getElementById("searchIngredient");
  const option = document.getElementById("option");

  // Limpiar los valores de los campos de entrada
  searchInput.value = "";
  searchIngredient.value = "";

  filterDrinks(); //  actualizar la visibilidad al limpiar
}

// Llamar a filterDrinks cuando la página cargue para inicializar el estado de los campos
window.onload = filterDrinks;
