
// delete metodo

function deleteDetail(id) {
  
    if (confirm('¿Estás seguro de que deseas eliminar esta card?')) {
    
        fetch(`${baseUrl}/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al eliminar el detalle del trago');
            }
            // Mostrar mensaje de éxito o realizar cualquier otra acción necesaria
            alert('Detalle del trago eliminado exitosamente');
      
            window.location.href = 'pagina-de-destino.html';
        })
        .catch(error => {
            console.error('Error al eliminar el detalle del trago:', error);
           
            alert('Error al eliminar el detalle del trago');
        });
    }
}
