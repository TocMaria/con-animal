// URL base do servidor
const BASE_URL = 'http://localhost:3000';

// Carregar todos os animais
async function loadAnimals() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('cg') ? urlParams.get('cg') : 'all';

    var urlB = `${BASE_URL}/animals/${category}`; 

    const response = await fetch(urlB);
    const animals = await response.json();

    const animalsList = document.getElementById('animals-list');
    animalsList.innerHTML = '';

    if (category && category != 'all') {
      document.getElementById("cat-title").textContent = category === 'dogs' ? 'Animais - Cachorros' : category === 'cats' ? 'Animais - Gatos' : 'Animais - Outros';      
    }

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
            <h3 class="ps-2">${animal.weight}kg</h3>
          </div>
          <span class="px-3 text-black-50">/</span>
          <div class="d-flex align-items-center">
            <h3 class="ps-2">${animal.age} anos</h3>
          </div>
        </div>

        <p>
          Similique neque nam consequuntur ad non maxime aliquam quas. Quibusdam animi praesentium. Aliquam et laboriosam eius aut nostrum quidem aliquid dicta.
        </p>

        <hr>

        <a href="detailsAnimal.html?id=${animal._id}"" class="readmore"><span>Mais Detalhes</span><i class="bi bi-arrow-right"></i></a>
        <div class="text-center mt-2">
        <a href="editAnimal.html?id=${animal._id}" class="button edit-btn btn btn-primary"><i class="bi bi-pencil"></i> Editar</a>
        <button onclick="deleteAnimal('${animal._id}')" class="delete-btn btn btn-secondary"> <i class="bi bi-trash"></i> Deletar</button>
        </div>
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

        <a href="detailsAnimal.html?id=${animal._id}"" class="readmore"><span>Mais Detalhes</span><i class="bi bi-arrow-right"></i></a>
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

