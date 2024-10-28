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

  // Llama a la función getDrinks con la URL actualizada y muestra el botón "Volver"
  getDrinks(fetchUrl, true);
}

function goBackToHome() {
  getDrinks(baseUrl, false);
  document.getElementById("searchInput").value = "";
  document.getElementById("searchIngredient").value = "";
  document.getElementById("option").value = "buscar";
  filterDrinks();

  // El botón "Volver" se oculta automáticamente dentro de getDrinks
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
