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