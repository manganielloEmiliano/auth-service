const jwt = require('jsonwebtoken');
const config = require('../config/config');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Asegúrate de que el token se envíe como 'Bearer <token>'
  if (!token) return res.status(401).json({ message: 'Token no proporcionado' });
  
  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });
    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;
