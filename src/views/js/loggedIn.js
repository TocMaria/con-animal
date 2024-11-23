document.addEventListener('DOMContentLoaded', () => {
  const userDataDiv1 = document.getElementById('user-data1');
  const userDataDiv2 = document.getElementById('user-data2');
  const addAnimalBtn = document.getElementById('add-animal-btn');
  const editBtns = document.querySelectorAll('.edit-btn');
  const deleteBtns = document.querySelectorAll('.delete-btn');
  const userNameDisplay = document.querySelectorAll('.user-name');

  // Verificar se o usuário está logado
  const token = localStorage.getItem('token');
  if (!token) return;
  
  if (userDataDiv1) {
    userDataDiv1.classList.remove('d-none');
    userDataDiv1.style.display = 'flex';
  }

  if (userDataDiv2) {
    userDataDiv2.classList.remove('d-none');
    userDataDiv2.classList.add('d-md-none', 'd-sm-none', 'd-lg-flex');
    userDataDiv2.style.display = 'flex';
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