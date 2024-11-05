document.addEventListener('DOMContentLoaded', () => {
  const userDataDiv = document.getElementById('user-data');
  const addAnimalBtn = document.getElementById('add-animal-btn');
  const editBtns = document.querySelectorAll('.edit-btn');
  const deleteBtns = document.querySelectorAll('.delete-btn');
  
  // Verificar se o usuário está logado
  const token = localStorage.getItem('token');
  if (token) {
    // Se o token existir, mostrar os botões
    addAnimalBtn.style.display = 'block';
    userDataDiv.style.display = 'block';
    try {
      editBtns.forEach(btnE => btnE.style.display = 'block');
      deleteBtns.forEach(btnD => btnD.style.display = 'block');
    } catch (e) {
      console.log(e)
    }
  }
});

function logout() {
  localStorage.removeItem('token');
  window.location.reload(); // Ou redirecione para a página de login
}
