function filterDrinks() {
  const option = document.getElementById("option").value;
  const searchInput = document.getElementById("searchInput");
  const searchIngredient = document.getElementById("searchIngredient");

  // Muestra el campo de búsqueda correspondiente y oculta el otro
  searchInput.style.display = option === "name" ? "block" : "none";
  searchIngredient.style.display = option === "ingredients" ? "block" : "none";
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

  // Llama a la función getDrinks con la URL actualizada
  getDrinks(fetchUrl);

  // Muestra el botón "Volver" al realizar la búsqueda
  document.getElementById("backBtn").style.display = "block";
}
function clearSearch() {
  const searchInput = document.getElementById("searchInput");
  const searchIngredient = document.getElementById("searchIngredient");
  const option = document.getElementById("option");

  // Limpiar los valores de los campos de entrada
  searchInput.value = "";
  searchIngredient.value = "";

  // Reiniciar la visualización según la opción seleccionada actualmente
  if (option.value === "name") {
    searchInput.style.display = "block";
    searchIngredient.style.display = "none";
  } else if (option.value === "ingredients") {
    searchInput.style.display = "none";
    searchIngredient.style.display = "block";
  } else {
    searchInput.style.display = "none";
    searchIngredient.style.display = "none";
  }
}

function goBackToHome() {
  getDrinks(baseUrl);
  document.getElementById("searchInput").value = "";
  document.getElementById("searchIngredient").value = "";
  document.getElementById("option").value = "buscar";
  filterDrinks();

  // Oculta el botón "Volver" nuevamente
  document.getElementById("backBtn").style.display = "none";
}
