
document.addEventListener('DOMContentLoaded', function() {
   

    toggleFormularioBtn.addEventListener('click', function() {
        let elementsToHide = document.querySelectorAll('main > *:not(#nuevaCoctelCard)');
        elementsToHide.forEach(function(element) {
            element.style.display = 'none';
        });

        nuevaCoctelCard.style.display = 'block';
    });

    cancelarBtn.addEventListener('click', function() {
        let elementsToShow = document.querySelectorAll('main > *:not(#nuevaCoctelCard)');
        elementsToShow.forEach(function(element) {
            element.style.display = 'flex';
        });

        nuevaCoctelCard.style.display = 'none';
     
    });

    coctelForm.addEventListener('submit', function(event) {
        event.preventDefault();

        let name = document.getElementById('nameInput').value;
        let preparation = document.getElementById('preparationInput').value;
        let image = document.getElementById('imageInput').value;
        let ingredients = document.getElementById('ingredientsInput').value.split(',');

        let nuevoCoctel = {
            name: name,
            preparation: preparation,
            image: image,
            ingredients: ingredients
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
          
         
            
            coctelForm.reset();

            cancelarBtn.click();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

})