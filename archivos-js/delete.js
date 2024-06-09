
 const showModal = (id) => {
  const modal = document.getElementById(`modal-${id}`);
  modal.classList.remove('hidden');
};

const hideModal = (id) => {
  const modal = document.getElementById(`modal-${id}`);
  modal.classList.add('hidden');
};

const deleteDetail = (id) => {
 
  fetch(`${baseUrl}/${id}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al eliminar el detalle del trago');
    }
    alert('Detalle del trago eliminado exitosamente');
    hideModal(id); // Ocultar la modal después de eliminar con éxito
  })
  .catch(error => {
    console.error('Error al eliminar el detalle del trago:', error);
    alert('Error al eliminar el detalle del trago');
  });
};