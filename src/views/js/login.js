document.getElementById('login-form').addEventListener('submit', async function (event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const loginData = { username, password };

  try {
    const response = await fetch('http://localhost:3000/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData)
    });

    const responseData = await response.json();

    const loginResponse = document.getElementById('login-response');
    if (response.ok) {
      loginResponse.textContent = responseData.message;
      loginResponse.style.color = 'green';

      // Salva o token no localStorage para uso posterior
      localStorage.setItem('token', responseData.token);

      // Redireciona para outra página após login (opcional)
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 2000);
    } else {
      loginResponse.textContent = responseData.error || 'Erro ao fazer login';
      loginResponse.style.color = 'red';
    }
  } catch (error) {
    console.error('Erro:', error);
    document.getElementById('login-response').textContent = 'Erro ao conectar com o servidor';
  }
});
