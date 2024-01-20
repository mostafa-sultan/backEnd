// auth.js

const jwt = require('jsonwebtoken');

const JWT_SECRET = 'secret_key';

const generateToken = (user) => {
  return jwt.sign({ user: { id: user.id, email: user.email } }, JWT_SECRET, { expiresIn: '22h' });
};

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = { generateToken, verifyToken };
