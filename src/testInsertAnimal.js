const mongoose = require('mongoose');
require('dotenv').config(); // Para usar variáveis de ambiente

const Animal = require('./models/Animal.js'); // Importa o modelo Animal

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    console.log('Conectado ao MongoDB');

    // Criar um novo animal
    const newAnimal = new Animal({
      species: "Cachorro",
      name: "Rex",
      sex: "M",
      age: 2,
      weight: 10,
      size: "Médio",
      rescue_date: new Date("2023-11-01"),
      rescue_location: "Rua das Flores, 123",
      profile_photo: "http://example.com/rex.jpg",
      last_location: "Abrigo Municipal",
      status: "disponível",
      castrated: true,
      chip_code: "123456789",
      veterinary_records: [
        {
          type: "Vacina",
          date: new Date("2023-10-15"),
          veterinarian: "Dr. Silva",
          allergies: "Nenhuma",
          comorbidities: "Nenhuma"
        }
      ],
      history: "Rex foi encontrado abandonado e está saudável."
    });

    // Salvar o novo animal no MongoDB
    await newAnimal.save();
    console.log('Animal inserido:', newAnimal);
  })
  .catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err);
  })
  .finally(() => {
    mongoose.connection.close(); // Fecha a conexão após o teste
  });
