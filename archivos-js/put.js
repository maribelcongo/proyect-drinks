// Función para ver detalles e ir atrás
const viewDetail = (id) => {
  const detailContainer = document.getElementById("detail-container");
  const container = document.getElementById("container");

  fetch(`${baseUrl}/${id}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error fetching data: ${res.status} ${res.statusText}`);
      }
      return res.json();
    })
    .then((drink) => {
      const { name, image, ingredients, preparation } = drink;
      const ingredientsList = Array.isArray(ingredients)
        ? ingredients.join(", ")
        : "N/A";

      detailContainer.innerHTML = `
        <div class="detail-card">
          <div class="detail-card_all">
        <button class="go_back_btn" onclick="goBack()">Ir Atrás</button>
            <div class="detail-card_header">
              <img src="${image}" alt="${name}" class="detail-card_img" />
              <h2 class="detail-card_title">${name}</h2>
            </div>
            <div class="detail-card_content">
              <div class="detail-ingredient_tex">
                <h3 class="tex-ing">ingredientes</h3>
                <p class="ingredients">${ingredientsList}</p>
              </div>
              <h3 class="tex-pre">preparacion</h3>
              <p class="preparation">${preparation}</p>
              <div class="detail-card_actions">
               <button class="edit_detail_btn" onclick="editDetail(${drink.id})">Editar</button>
               <button class="delete_detail_btn" onclick="showModal(${id})">Eliminar</button>
                <div class="modal-contenedor hidden" id="modal-${id}">
                  <p>¿Estás seguro que deseas borrar este coctel ?</p>
                  <div class="btn-modal">
                  <button class="confirmar-eliminar" onclick="deleteDetail(${id})">Eliminar coctel</button>
                  <button class="cancelar" onclick="hideModal(${id})">Cancelar</button>
                  </div>
            </div>

          </div>
          <div id="editFormContainer"></div>
        </div>
      `;
      container.style.display = "none";
      detailContainer.style.display = "block";
    })
    .catch((err) => {
      console.error("Error fetching drink details:", err);
      alert("Error fetching drink details. Please try again later.");
    });
};

// ir atras
const goBack = () => {
  const detailContainer = document.getElementById("detail-container");
  const container = document.getElementById("container");
  detailContainer.style.display = "none";
  container.style.display = "flex";
};

// Función para editar detalles del trago
const editDetail = (id) => {
  fetch(`${baseUrl}/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al obtener detalles del trago");
      }
      return response.json();
    })
    .then((data) => {
      const { name, image, preparation, ingredients } = data;
      const ingredientsList = Array.isArray(ingredients)
        ? ingredients.join(", ")
        : "";

      const editFormContainer = document.getElementById("editFormContainer");
      editFormContainer.innerHTML = `
       <div class="editFormContainer">
      <h2>Editar coctel</h2>
        <form id="editForm">
          <label for="editName">Nombre:</label>
          <input type="text" id="editName" name="editName" value="${name}" required>

          <label for="editImage">URL de la imagen:</label>
          <input type="text" id="editImage" name="editImage" value="${image}" required>

          <label for="editPreparation">Preparación:</label>
          <textarea id="editPreparation" name="editPreparation" required>${preparation}</textarea>

          <label for="editIngredients">Ingredientes (separados por coma):</label>
          <input type="text" id="editIngredients" name="editIngredients" value="${ingredientsList}" required>

          <div class="btn-save-sumit">
          <button type="submit" class="save-btn">Guardar Cambios</button>
          <button type="button" onclick="viewDetail(${id})" class="cancel-edit">Cancelar</button>

          </div>
        </form>
        </div>
      `;

      document
        .getElementById("editForm")
        .addEventListener("submit", function (event) {
          event.preventDefault(); // Evitar que el formulario se envíe automáticamente

          const updatedName = document.getElementById("editName").value;
          const updatedImage = document.getElementById("editImage").value;
          const updatedPreparation =
            document.getElementById("editPreparation").value;
          const updatedIngredients = document
            .getElementById("editIngredients")
            .value.split(",")
            .map((ingredient) => ingredient.trim());

          const updatedDetail = {
            name: updatedName,
            image: updatedImage,
            preparation: updatedPreparation,
            ingredients: updatedIngredients,
          };

          // Enviar los datos actualizados a la API utilizando el método PUT
          fetch(`${baseUrl}/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedDetail),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Error al actualizar los detalles del trago");
              }

              alert("Detalles del trago actualizados exitosamente");
              viewDetail(id); // Mostrar los detalles actualizados
            })
            .catch((error) => {
              console.error(
                "Error al actualizar los detalles del trago:",
                error
              );
              alert("Error al actualizar los detalles del trago");
            });
        });
    })
    .catch((error) => {
      console.error("Error al obtener detalles del trago:", error);
      alert("Error al obtener detalles del trago");
    });
};
