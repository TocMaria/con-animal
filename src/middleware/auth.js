// middlewares/auth.js
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key';

module.exports = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};
