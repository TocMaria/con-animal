require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./src/client/js/database');

const animalRoutes = require('./src/routes/animalRoutes'); // Importa as rotas dos animais

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Conectar ao banco de dados
connectDB();

// Rota de teste
app.get('/', (req, res) => {
  res.send('Servidor está funcionando!');
});

// Usar as rotas dos animais
app.use('/animals', animalRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.use(express.static('public'));
