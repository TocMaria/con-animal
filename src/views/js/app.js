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
        const li = document.createElement('li');
        li.innerHTML = `
          <img src="${animal.profile_photo}"> </img>
          <strong>${animal.name}</strong> - ${animal.species} - ${animal.age} anos<br>
          Peso: ${animal.weight}kg | Sexo: ${animal.sex}<br>
          <a href="editAnimal.html?id=${animal._id}" class="button edit-btn">Editar</a>
          <button onclick="deleteAnimal('${animal._id}')" class="delete-btn">Deletar</button>
        `;
        animalsList.appendChild(li);
      }); 
    } else {
      animals.forEach(animal => {
        const li = document.createElement('li');
        li.innerHTML = `
          <img src="${animal.profile_photo}"> </img>
          <strong>${animal.name}</strong> - ${animal.species} - ${animal.age} anos<br>
          Peso: ${animal.weight}kg | Sexo: ${animal.sex}<br>
        `;
        animalsList.appendChild(li);
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
