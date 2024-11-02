require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const Animal = require('./src/models/Animal');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

// Conecte ao banco de dados
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rota de teste
app.get('/', (req, res) => {
  res.send('Servidor está funcionando!');
});

// Middleware para JSON
app.use(express.json());

app.post('/animals', async (req, res) => {
  try {
    const animalData = req.body; // Recebe os dados do corpo da requisição
    const newAnimal = new Animal(animalData); // Cria um novo documento Animal
    await newAnimal.save(); // Salva no MongoDB
    res.status(201).json(newAnimal); // Retorna o animal criado
  } catch (error) {
    console.error('Erro ao adicionar animal:', error);
    res.status(500).json({ error: 'Erro ao adicionar animal' });
  }
});

// Rota para listar todos os animais
app.get('/animals', async (req, res) => {
  try {
    const animals = await Animal.find(); // Busca todos os animais
    res.json(animals); // Retorna os animais encontrados
  } catch (error) {
    console.error('Erro ao listar animais:', error);
    res.status(500).json({ error: 'Erro ao listar animais' });
  }
});

// Rota para pegar um animal pelo ID 
app.get('/animals/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const getAnimal = await Animal.findById(id); // busca o animal pelo ID

    if (!getAnimal) {
      return res.status(404).json({ error: 'Animal não encontrado' });
    }

    res.json(getAnimal); // envia os dados do animal em JSON
  } catch (error) {
    console.error('Erro ao encontrar animal:', error);
    res.status(500).json({ error: 'Erro ao encontrar animal' });
  }
});

// Rota para atualizar um animal pelo ID
app.put('/animals/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAnimal = await Animal.findByIdAndUpdate(id, req.body, { new: true }); // Atualiza e retorna o animal atualizado
    if (!updatedAnimal) {
      return res.status(404).json({ error: 'Animal não encontrado' });
    }
    res.json(updatedAnimal);
  } catch (error) {
    console.error('Erro ao atualizar animal:', error);
    res.status(500).json({ error: 'Erro ao atualizar animal' });
  }
});

// Rota para deletar um animal pelo ID
app.delete('/animals/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAnimal = await Animal.findByIdAndDelete(id); // Deleta o animal pelo ID
    if (!deletedAnimal) {
      return res.status(404).json({ error: 'Animal não encontrado' });
    }
    res.json({ message: 'Animal deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar animal:', error);
    res.status(500).json({ error: 'Erro ao deletar animal' });
  }
});


// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.use(express.static('public'));
