document.addEventListener("DOMContentLoaded", function () {
  const toggleFormularioBtn = document.getElementById("toggleFormularioBtn");
  const nuevaCoctelCard = document.getElementById("nuevaCoctelCard");
  const coctelForm = document.getElementById("coctelForm");
  const cancelarBtn = document.getElementById("cancelarBtn");
  const loader = document.getElementById("loader");

  toggleFormularioBtn.addEventListener("click", function () {
    let elementsToHide = document.querySelectorAll(
      "main > *:not(#nuevaCoctelCard)"
    );
    elementsToHide.forEach(function (element) {
      element.style.display = "none";
    });

    nuevaCoctelCard.style.display = "block";
  });

  cancelarBtn.addEventListener("click", function () {
    loader.style.display = "block"; // Mostrar el spinner
    let elementsToShow = document.querySelectorAll(
      "main > *:not(#nuevaCoctelCard)"
    );
    elementsToShow.forEach(function (element) {
      element.style.display = "flex";
    });

    nuevaCoctelCard.style.display = "none";
    getDrinks(baseUrl); // Volver a cargar los cócteles

    setTimeout(() => {
      loader.style.display = "none";
      document.getElementById("searchForm").style.display = "flex";
    }, 1000);
  });

  coctelForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let name = document.getElementById("nameInput").value;
    let preparation = document.getElementById("preparationInput").value;
    let image = document.getElementById("imageInput").value;
    let ingredients = document
      .getElementById("ingredientsInput")
      .value.split(",");

    let nuevoCoctel = {
      name: name,
      preparation: preparation,
      image: image,
      ingredients: ingredients,
    };

    loader.style.display = "block"; // Mostrar el spinner
    nuevaCoctelCard.style.display = "none"; // Ocultar el formulario

    fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoCoctel),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al crear el cóctel");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Cóctel creado exitosamente:", data);
        coctelForm.reset();
        getDrinks(baseUrl);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        loader.style.display = "none";
        document.getElementById("searchForm").style.display = "flex";
      });
  });
});
