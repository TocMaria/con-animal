require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./src/client/js/database');

const animalRoutes = require('./src/routes/animalRoutes');
const userRoutes = require('./src/routes/userRoutes');


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conectar ao banco de dados
connectDB();

// Rotas
app.use('/animals', animalRoutes);
app.use('/user', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.use(express.static('public'));
