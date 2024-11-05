// Deletar animal
async function deleteAnimal(id) {
  try {
    await fetch(`${BASE_URL}/animals/${id}`, { method: 'DELETE' });
    loadAnimals();
  } catch (error) {
    console.error('Erro ao deletar animal:', error);
  }
}
