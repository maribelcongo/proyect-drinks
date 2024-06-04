

const containe=document.getElementById("main-container");
const spinner =document.querySelector(".spinner-container");
 const container = document.getElementById("container");
const baseUrl ="https://66258e07052332d5532047d6.mockapi.io/drinks/cocteles";

const crearCoctelBtn = document.getElementById('crearCoctelBtn');
 const coctelContainer = document.getElementById('coctelContainer');



// funcion get para traer los elementos y mostrsr y ocultar el spiner

const getDrinks = (fetchUrl) => {
  const spinner = document.querySelector('.spinner');
  spinner.style.display = 'block'; 
  
  setTimeout(() => {
    fetch(fetchUrl)
      .then((res) => res.json())
      .then((data) => {
        const container = document.getElementById('container');
        container.innerHTML = "";

        data.forEach((drink) => {
          const { id, name, image, ingredients, preparation } = drink;
          container.innerHTML += `
            <div class="card">
              <img
                src="${image}"
                alt="${name}"
                class="card_img"
              />
              <div class="card_text_container">
                <h2 class="card_title">${name}</h2>
                <button class="view_detail_btn" data-cardid="${id}" onclick="viewDetail(${id})" id="verDetalle" >Ver Detalle</button>
              </div>
            </div>
          `;
        });


        spinner.style.display = 'none';
      })
      .catch((err) => {
        console.log(err);
        spinner.style.display = 'none'; 
      });
  }, 2000); 
};

getDrinks(baseUrl);



