const User = require('../models/User');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: 'Usuário já existe' });
    }

    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ error: 'Credenciais inválidas' });
    }

    // Gera o token JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.status(200).json({ token, message: 'Login bem-sucedido' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao realizar login' });
  }
};

module.exports = { registerUser, loginUser };
