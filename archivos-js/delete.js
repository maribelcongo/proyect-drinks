const showModal = (id) => {
  const modal = document.getElementById(`modal-${id}`);
  modal.classList.remove("hidden");
};

const hideModal = (id) => {
  const modal = document.getElementById(`modal-${id}`);
  modal.classList.add("hidden");
};

const deleteDetail = (id) => {
  // Primero, eliminamos el detalle
  fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al eliminar el detalle del trago");
      }

      // Aquí, ocultamos la tarjeta del detalle
      const detailContainer = document.getElementById("detail-container");
      const container = document.getElementById("container");

      // Verificamos si el contenedor de detalles es visible
      if (detailContainer.style.display === "block") {
        detailContainer.style.display = "none"; // Ocultamos la vista de detalles
        container.style.display = "flex"; // Volvemos a mostrar el contenedor principal
      }

      hideModal(id); // Ocultamos el modal de confirmación

      // Recargamos la lista de cócteles después de eliminar uno
      getDrinks(baseUrl);
    })
    .catch((error) => {
      console.error("Error al eliminar el detalle del trago:", error);
      alert("Error al eliminar el detalle del trago");
    });
};
