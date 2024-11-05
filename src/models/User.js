const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Hash da senha antes de salvar o usuário
userSchema.pre('save', async function (next) {
  // Só realiza o hash se a senha foi modificada ou se é um novo usuário
  if (!this.isModified('password')) return next();

  try {
    const salt = bcrypt.genSaltSync(10);  // Usando a versão síncrona do bcryptjs
    this.password = bcrypt.hashSync(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para verificar a senha
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
