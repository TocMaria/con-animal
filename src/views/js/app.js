// URL base do servidor
const BASE_URL = 'http://localhost:3000';

// Carregar todos os animais
async function loadAnimals() {
  try {
    const response = await fetch(`${BASE_URL}/animals`);
    const animals = await response.json();

    const animalsList = document.getElementById('animals-list');
    animalsList.innerHTML = '';

    const token = localStorage.getItem('token');
    if (token) {
      animals.forEach(animal => {
        const newPost = document.createElement('div');
        newPost.classList.add('col-lg-3');
        newPost.innerHTML = `
        <article class="position-relative h-100">
            
      <div class="post-img position-relative overflow-hidden">
        <img src="${animal.profile_photo}" class="img-fluid" alt="">
        <span class="post-date">${animal.sex === 'M' ? 'Macho' : 'Fêmea'}</span>
      </div>

      <div class="post-content d-flex flex-column">

        <h3 class="post-title">${animal.name}</h3>

        <div class="meta d-flex align-items-center">
          <div class="d-flex align-items-center">
            <i class="bi bi-person"></i> <span class="ps-2">${animal.weight}kg</span>
          </div>
          <span class="px-3 text-black-50">/</span>
          <div class="d-flex align-items-center">
            <i class="bi bi-folder2"></i> <span class="ps-2">${animal.age} anos</span>
          </div>
        </div>

        <p>
          Similique neque nam consequuntur ad non maxime aliquam quas. Quibusdam animi praesentium. Aliquam et laboriosam eius aut nostrum quidem aliquid dicta.
        </p>

        <hr>

        <a href="blog-details.html" class="readmore stretched-link"><span>Read More</span><i class="bi bi-arrow-right"></i></a>
        <a href="editAnimal.html?id=${animal._id}" class="button edit-btn">Editar</a>
          <button onclick="deleteAnimal('${animal._id}')" class="delete-btn">Deletar</button>
      </div>
      </article>
        `;
        animalsList.appendChild(newPost);
      }); 
    } else {
      animals.forEach(animal => {
        const newPost = document.createElement('div');
        newPost.classList.add('col-lg-3');
        newPost.innerHTML = `
        <article class="position-relative h-100">
            
      <div class="post-img position-relative overflow-hidden">
        <img src="${animal.profile_photo}" class="img-fluid" alt="">
        <span class="post-date">${animal.sex === 'M' ? 'Macho' : 'Fêmea'}</span>
      </div>

      <div class="post-content d-flex flex-column">

        <h3 class="post-title">${animal.name}</h3>

        <div class="meta d-flex align-items-center">
          <div class="d-flex align-items-center">
            <i class="bi bi-person"></i> <span class="ps-2">${animal.weight}kg</span>
          </div>
          <span class="px-3 text-black-50">/</span>
          <div class="d-flex align-items-center">
            <i class="bi bi-folder2"></i> <span class="ps-2">${animal.age} anos</span>
          </div>
        </div>

        <p>
          Similique neque nam consequuntur ad non maxime aliquam quas. Quibusdam animi praesentium. Aliquam et laboriosam eius aut nostrum quidem aliquid dicta.
        </p>

        <hr>

        <a href="blog-details.html" class="readmore stretched-link"><span>Read More</span><i class="bi bi-arrow-right"></i></a>
      </div>
      </article>
        `;
        animalsList.appendChild(newPost);
      });
    }

  } catch (error) {
    console.error('Erro ao carregar animais:', error); 
  }
}


// Carregar dados do animal para edição
async function loadAnimalData() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  if (id) {
    try {
      const response = await fetch(`${BASE_URL}/animals/${id}`);
      if (!response.ok) {
         console.error('Erro ao buscar dados do animal status: {0} \n url: {1}', response.status, `${BASE_URL}/animals/${id}`);
      }

      const animal = await response.json();

      document.getElementById('species').value = animal.species;
      document.getElementById('name').value = animal.name;
      document.getElementById('sex').value = animal.sex;
      document.getElementById('age').value = animal.age;
      document.getElementById('weight').value = animal.weight;
    } catch (error) {
      console.error('Erro ao carregar dados do animal:', error);
    }
  }
}
