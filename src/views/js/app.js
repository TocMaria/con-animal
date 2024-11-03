// URL base do servidor
const BASE_URL = 'http://localhost:3000';

// Carregar todos os animais
async function loadAnimals() {
  try {
    const response = await fetch(`${BASE_URL}/animals`);
    const animals = await response.json();

    const animalsList = document.getElementById('animals-list');
    animalsList.innerHTML = '';

    animals.forEach(animal => {
      const li = document.createElement('li');
      li.innerHTML = `
        <img src="${animal.profile_photo}"> </img>
        <strong>${animal.name}</strong> - ${animal.species} - ${animal.age} anos<br>
        Peso: ${animal.weight}kg | Sexo: ${animal.sex}<br>
        <a href="editAnimal.html?id=${animal._id}" class="button">Editar</a>
        <button onclick="deleteAnimal('${animal._id}')">Deletar</button>
      `;
      animalsList.appendChild(li);
    });
  } catch (error) {
    console.error('Erro ao carregar animais:', error); 
  }
}

// async function addAnimal(event) {
//   event.preventDefault();

//   const formData = new FormData(document.getElementById('add-animal-form'));
  
//   try {
//     await fetch(`${BASE_URL}/animals`, {
//       method: 'POST',
//       body: formData
//     });

//     window.location.href = 'index.html';
//   } catch (error) {
//     console.error('Erro ao adicionar animal:', error);
//   }
// }

// async function addAnimal(event) {
//   event.preventDefault();

//   const species = document.getElementById('species').value;
//   const name = document.getElementById('name').value;
//   const sex = document.querySelector('input[name="sex"]:checked').value;
//   const age = parseInt(document.getElementById('age').value, 10);
//   const weight = parseFloat(document.getElementById('weight').value);
//   const size = document.getElementById('size').value;
//   const rescue_date = document.getElementById('rescue_date').value;
//   const rescue_location = document.getElementById('rescue_location').value;
//   const profile_photo = document.getElementById('profile_photo');
//   const last_location = document.getElementById('last_location').value;
//   const status = document.getElementById('status').value;
//   const castrated = document.querySelector('input[name="castrated"]:checked')?.value === 'true';
//   const chip_code = document.getElementById('chip_code').value;
//   const history = document.getElementById('history').value;

//   // Coleta dos registros veterinários
//   const veterinaryRecordsElements = document.querySelectorAll('#veterinary-records > div');
//   const veterinary_records = Array.from(veterinaryRecordsElements).map(record => ({
//     type: record.querySelector(`[name*="type"]`).value,
//     date: record.querySelector(`[name*="date"]`).value,
//     veterinarian: record.querySelector(`[name*="veterinarian"]`).value,
//     allergies: record.querySelector(`[name*="allergies"]`).value,
//     comorbidities: record.querySelector(`[name*="comorbidities"]`).value
//   }));

//   const animalData = {
//     species,
//     name,
//     sex,
//     age,
//     weight,
//     size,
//     rescue_date,
//     rescue_location,
//     profile_photo,
//     last_location,
//     status,
//     castrated,
//     chip_code,
//     veterinary_records,
//     history
//   };

//   try {
//     await fetch(`${BASE_URL}/animals`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(animalData)
//     });

//     window.location.href = 'index.html'; // Redireciona para a tela principal
//   } catch (error) {
//     console.error('Erro ao adicionar animal:', error);
//   }
// }


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

// Atualizar animal
async function updateAnimal(event) {
  event.preventDefault();

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  const species = document.getElementById('species').value;
  const name = document.getElementById('name').value;
  const sex = document.getElementById('sex').value;
  const age = document.getElementById('age').value;
  const weight = document.getElementById('weight').value;

  try {
    await fetch(`${BASE_URL}/animals/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ species, name, sex, age, weight })
    });

    window.location.href = 'index.html'; // Redireciona para a tela principal
  } catch (error) {
    console.error('Erro ao atualizar animal:', error);
  }
}

// Deletar animal
async function deleteAnimal(id) {
  try {
    await fetch(`${BASE_URL}/animals/${id}`, { method: 'DELETE' });
    loadAnimals();
  } catch (error) {
    console.error('Erro ao deletar animal:', error);
  }
}
