
// funcion para ver el detalle de un trago boton ver detalle
function viewDetail(id) {
    
    let elementsToHide = document.querySelectorAll('main > *:not(#detalleCoctel)');
    elementsToHide.forEach(function(element) {
        element.style.display = 'none';
    });

    let detalleCoctel = document.getElementById('detalleCoctel');
    if (detalleCoctel) { 
        detalleCoctel.style.display = 'block';

        fetch(`${baseUrl}/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener detalles del trago');
                }
                return response.json();
            })
            .then(data => {
              
              let detalleContainer = document.getElementById('detalleContainer');
                detalleContainer.innerHTML = `
                    <h2>${data.name}</h2>
                    <img src="${data.image}" alt="${data.name}">
                    <p><strong>Preparación:</strong> ${data.preparation}</p>
                    <p><strong>Ingredientes:</strong> ${data.ingredients}</p>
                    <button onclick="editDetail(${data.id})">Editar</button>
                    <button onclick="deleteDetail(${data.id})">Eliminar</button>
                 

         
                `;
            })
            .catch(error => {
                console.error('Error al obtener detalles del trago:', error);
            });
    } else {
        console.error('Elemento detalleCoctel no encontrado.');
    }
}



// --------------------------------------------------------------------------------------------

// metodo put
        
        // Función para editar detalles del trago
function editDetail(id) {
   
    fetch(`${baseUrl}/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener detalles del trago');
            }
            return response.json();
        })
        .then(data => {
           
            let detalleContainer = document.getElementById('detalleContainer');
            detalleContainer.innerHTML = `
                <h2>Editar coctel</h2>
                <form id="editForm">
                    <label for="editName">Nombre:</label>
                    <input type="text" id="editName" name="editName" value="${data.name}" required><br>

                    <label for="editImage">URL de la imagen:</label>
                    <input type="text" id="editImage" name="editImage" value="${data.image}" required><br>

                    <label for="editPreparation">Preparación:</label>
                    <textarea id="editPreparation" name="editPreparation" required>${data.preparation}</textarea><br>

                    <label for="editIngredients">Ingredientes (separados por coma):</label>
                    <input type="text" id="editIngredients" name="editIngredients" value="${data.ingredients}" required><br>

                    <button type="submit">Guardar Cambios</button>
                    <button type="button" onclick="viewDetail(${id})">Cancelar</button>
                </form>
            `;

       
            document.getElementById('editForm').addEventListener('submit', function(event) {
                event.preventDefault(); // Evitar que el formulario se envíe automáticamente

                let updatedName = document.getElementById('editName').value;
                let updatedImage = document.getElementById('editImage').value;
                let updatedPreparation = document.getElementById('editPreparation').value;
                let updatedIngredients = document.getElementById('editIngredients').value.split(',');

             
                let updatedDetail = {
                    name: updatedName,
                    image: updatedImage,
                    preparation: updatedPreparation,
                    ingredients: updatedIngredients
                };

                // Enviar los datos actualizados a la API utilizando el método PUT
                fetch(`${baseUrl}/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedDetail)
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al actualizar los detalles del trago');
                    }
               
                    alert('Detalles del trago actualizados exitosamente');
                })
                .catch(error => {
                    console.error('Error al actualizar los detalles del trago:', error);
                 
                    alert('Error al actualizar los detalles del trago');
                });
            });
        })
        .catch(error => {
            console.error('Error al obtener detalles del trago:', error);
          
            alert('Error al obtener detalles del trago');
        });
}

