// login.js
const BASE_URL = 'http://localhost:3000';

document.getElementById('loginForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token);
      window.location.href = 'index.html';
    } else {
      console.error(data.error);
    }
  } catch (error) {
    console.error('Erro ao logar:', error);
  }
});
