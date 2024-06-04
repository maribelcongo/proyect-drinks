


//  
document.addEventListener('DOMContentLoaded', function() {
            document.getElementById('toggleFormularioBtn').addEventListener('click', function() {
              
                let elementsToHide = document.querySelectorAll('main > *:not(#nuevaCoctelCard)');
                elementsToHide.forEach(function(element) {
                    element.style.display = 'none';
                });

             
                document.getElementById('nuevaCoctelCard').style.display = 'block';
            });

            document.getElementById('cancelarBtn').addEventListener('click', function() {
               
                let elementsToShow = document.querySelectorAll('main > *:not(#nuevaCoctelCard)');
                elementsToShow.forEach(function(element) {
                    element.style.display = 'block';
                });

                // Ocultar el formulario
                document.getElementById('nuevaCoctelCard').style.display = 'none';
            });

            document.getElementById('coctelForm').addEventListener('submit', function(event) {
                event.preventDefault(); 

                let nombre = document.getElementById('nameInput').value;
                let preparacion = document.getElementById('preparationInput').value;
                let imagen = document.getElementById('imageInput').value;
                let alcohol = document.getElementById('alcoholInput').value;
                let ingredientes = document.getElementById('ingredientsInput').value.split(',');

                let nuevoCoctel = {
                    nombre: nombre,
                    preparacion: preparacion,
                    imagen: imagen,
                    alcohol: alcohol,
                    ingredientes: ingredientes
                };

                fetch(baseUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(nuevoCoctel)
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al crear el coctel');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Coctel creado exitosamente:', data);
                    
                })
                .catch(error => {
                    console.error('Error:', error);
                    
                });
            });
        });
