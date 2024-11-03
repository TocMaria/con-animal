// routes/animalRoutes.js
const express = require('express');
const router = express.Router();
const AnimalController = require('../controllers/AnimalController');
// const auth = require('./middleware/auth');
const upload = require('../client/js/multer');

// Rotas para os animais
router.post('/', upload.fields([{ name: 'profile_photo', maxCount: 1 }, { name: 'gallery_public', maxCount: 10 }, { name: 'gallery_private', maxCount: 10 }]), AnimalController.registerAnimal);
router.get('/', AnimalController.getAnimals);
router.get('/:id', AnimalController.getAnimalById);
router.put('/:id', AnimalController.updateAnimal);
router.delete('/:id', AnimalController.deleteAnimal);

module.exports = router;
