const BASE_URL = 'http://localhost:3000';

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