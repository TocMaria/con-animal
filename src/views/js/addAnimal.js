const BASE_URL = 'http://localhost:3000/animals';

async function addAnimal(event) {
  event.preventDefault();

  const formData = new FormData(document.getElementById('add-animal-form'));

  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      const animal = await response.json();
      console.log('Animal registrado:', animal);
      window.location.href = 'index.html';
    } else {
      console.error('Erro ao registrar animal');
    }
  } catch (error) {
    console.error('Erro ao adicionar animal:', error);
  }
}
