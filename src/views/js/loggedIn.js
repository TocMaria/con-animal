document.addEventListener('DOMContentLoaded', () => {
  const userDataDiv = document.getElementById('user-data');
  const addAnimalBtn = document.getElementById('add-animal-btn');
  const editBtns = document.querySelectorAll('.edit-btn');
  const deleteBtns = document.querySelectorAll('.delete-btn');
  const userNameDisplay = document.querySelectorAll('.user-name');

  // Verificar se o usuário está logado
  const token = localStorage.getItem('token');
  if (!token) return;
  
  if (userDataDiv) {
    userDataDiv.classList.remove('d-none');
    userDataDiv.style.display = 'flex';
  }

  if (addAnimalBtn) {
    addAnimalBtn.classList.remove('d-none');
    addAnimalBtn.style.display = 'block';
  }

  if (userNameDisplay) {
    userNameDisplay.forEach(userD => {userD.textContent = localStorage.getItem('userName') || ''});
  }

  editBtns.forEach(btn => {
    if (btn) btn.classList.remove('d-none');
  });

  deleteBtns.forEach(btn => {
    if (btn) btn.classList.remove('d-none');
  });
});

function logout() {
  localStorage.removeItem('token');
  window.location.reload(); // Ou redirecione para a página de login
}

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);