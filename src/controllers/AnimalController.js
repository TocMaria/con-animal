// controllers/AnimalController.js
const Animal = require('../models/Animal');


exports.registerAnimal = async (req, res) => {
  try {
    console.log('Dados recebidos:', req.body);
    console.log('Arquivos recebidos:', req.files);

    const { species, name, sex, age, weight, size, rescue_date, rescue_location, last_location, status, castrated, chip_code, veterinary_records, history } = req.body;
    const profile_photo = req.files['profile_photo'] ? req.files['profile_photo'][0].path : '';
    const gallery_public = req.files['gallery_public'] ? req.files['gallery_public'].map(file => file.path) : [];
    const gallery_private = req.files['gallery_private'] ? req.files['gallery_private'].map(file => file.path) : [];

    const newAnimal = new Animal({
      species,
      name,
      sex,
      age,
      weight,
      size,
      rescue_date,
      rescue_location,
      profile_photo,
      gallery_public,
      gallery_private,
      last_location,
      status,
      castrated,
      chip_code,
      veterinary_records: veterinary_records,
      history
    });

    const savedAnimal = await newAnimal.save();
    res.status(201).json(savedAnimal);
  } catch (e) {
    console.error('Erro ao adicionar animal:', e);
    res.status(500).json({ error: 'Erro ao adicionar animal' + e.statusText });
  }
};

exports.getAnimals = async (req, res) => {
  try {
    const animals = await Animal.find();
    res.json(animals);
  } catch (error) {
    console.error('Erro ao listar animais:', error);
    res.status(500).json({ error: 'Erro ao listar animais' });
  }
};

exports.getAllAnimals = async (req, res) => {
  try {
    const animals = await Animal.find();
    res.status(200).json(animals);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar todos os animais' });
  }
};

// Função genérica para buscar animais por espécie
exports.getAnimalsBySpecies = (species) => async (req, res) => {
  try {
    const animals = await Animal.find({ species });
    res.status(200).json(animals);
  } catch (error) {
    res.status(500).json({ error: `Erro ao buscar animais da espécie ${species}` });
  }
};

exports.getAnimalById = async (req, res) => {
  try {
    const { id } = req.params;
    const animal = await Animal.findById(id);
    if (!animal) return res.status(404).json({ error: 'Animal não encontrado' });
    res.json(animal);
  } catch (error) {
    console.error('Erro ao encontrar animal:', error);
    res.status(500).json({ error: 'Erro ao encontrar animal' });
  }
};

exports.updateAnimal = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAnimal = await Animal.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedAnimal) return res.status(404).json({ error: 'Animal não encontrado' });
    res.json(updatedAnimal);
  } catch (error) {
    console.error('Erro ao atualizar animal:', error);
    res.status(500).json({ error: 'Erro ao atualizar animal' });
  }
};

exports.deleteAnimal = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAnimal = await Animal.findByIdAndDelete(id);
    if (!deletedAnimal) return res.status(404).json({ error: 'Animal não encontrado' });
    res.json({ message: 'Animal deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar animal:', error);
    res.status(500).json({ error: 'Erro ao deletar animal' });
  }
};
