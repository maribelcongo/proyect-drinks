// ver detalle e ir atras


const viewDetail = (id) => {
      const detailContainer = document.getElementById('detail-container');
      const container = document.getElementById('container');
      const spinner = document.querySelector('.spinner');

      spinner.style.display = 'block';
      container.style.display = 'none';

 
      setTimeout(() => {
        fetch(`${baseUrl}/${id}`)
          .then((res) => {
            if (!res.ok) {
              throw new Error(`Error fetching data: ${res.status} ${res.statusText}`);
            }
            return res.json();
          })
          .then((drink) => {
            const { name, image, ingredients, preparation } = drink;
            const ingredientsList = Array.isArray(ingredients) ? ingredients.join(', ') : 'N/A';

            detailContainer.innerHTML = `
              <div class="detail-card">
                <button class="go_back_btn" onclick="goBack()">Atrás</button>
                <div class="detail-card_all">
                  <div class="detail-card_header">
                    <img src="${image}" alt="${name}" class="detail-card_img" />
                    <div class="detail-card_content">
                      <h2 class="detail-card_title">${name}</h2>
                      <p class="ingredients">Ingredientes: ${ingredientsList}</p>
                      <p class="preparation">Preparación: ${preparation}</p>
                      <div class="detail-card_actions">
                        <button class="edit_detail_btn" onclick="editDetail(${drink.id})">Editar</button>
                        <button class="delete_detail_btn" onclick="deleteDetail(${drink.id})">Eliminar</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            `;

            spinner.style.display = 'none';
            detailContainer.style.display = 'block';
          })
          .catch((err) => {
            console.error('Error fetching drink details:', err);
            alert('Error fetching drink details. Please try again later.');

        
            spinner.style.display = 'none';
            container.style.display = 'block';
          });
      }, 2000);
   


    };
 const goBack = () => {
  const detailContainer = document.getElementById('detail-container');
  const container = document.getElementById('container');
  detailContainer.style.display = 'none'; // Ocultar el contenedor de detalles
  container.style.display = 'block'; // Mostrar el contenedor principal
};
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

