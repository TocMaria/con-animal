const mongoose = require('mongoose');

const veterinaryRecordSchema = new mongoose.Schema({
  type: { type: String, required: true }, // tipo de vermífugo ou vacina
  date: { type: Date, required: true }, // data da aplicação
  veterinarian: { type: String, required: true }, // responsável veterinário
  allergies: { type: String }, // alergias do animal
  comorbidities: { type: String } // comorbidades do animal
}, { _id: false }); // não criar um ID para subdocumentos

const animalSchema = new mongoose.Schema({
  species: { type: String, required: true },
  name: { type: String, required: true },
  sex: { type: String, enum: ['M', 'F'], required: true },
  age: { type: Number, required: true },
  weight: { type: Number, required: true },
  size: { type: String, enum: ['PP', 'P', 'M', 'G', 'GG'], required: true }, // porte do animal (pequeno, médio, grande)
  rescue_date: { type: Date, required: true },
  rescue_location: { type: String, required: true },
  profile_photo: { type: String }, // URL ou caminho da imagem
  last_location: { type: String }, // localização mais recente
  status: { type: String, enum: ['com tutor', 'em lar', 'adotado', 'disponível'], required: true },
  castrated: { type: Boolean }, // se o animal é castrado
  chip_code: { type: String }, // código do chip
  gallery_public: [{ type: String }], // Galeria de imagens 1
  gallery_private: [{ type: String }], // Galeria de imagens 2
  veterinary_records: [veterinaryRecordSchema], // registro veterinário
  history: { type: String }, // histórico de saúde e tratamentos
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Animal', animalSchema);
