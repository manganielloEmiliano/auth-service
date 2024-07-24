const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/user');
const config = require('../config/config');

const register = async (req, res) => {
  try {
    const { nombre, apellido, dni, fechaNacimiento, email, telefono, aptoFisico, roles, contraseña } = req.body;
    
    const existingUser = await Usuario.findOne({ dni });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario con este DNI ya existe' });
    }
    
    const hashedPassword = await bcrypt.hash(contraseña, 10);
    const user = new Usuario({
      nombre,
      apellido,
      dni,
      fechaNacimiento,
      email,
      telefono,
      aptoFisico,
      roles,
      contraseña: hashedPassword
    });
    
    await user.save();
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { dni, contraseña } = req.body;
    const user = await Usuario.findOne({ dni });
    if (!user) {
      return res.status(400).json({ message: 'DNI o contraseña incorrectos' });
    }
    const isMatch = await bcrypt.compare(contraseña, user.contraseña);
    if (!isMatch) {
      return res.status(400).json({ message: 'DNI o contraseña incorrectos' });
    }
    const token = jwt.sign({ userId: user._id, roles: user.roles }, config.jwtSecret, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login };
