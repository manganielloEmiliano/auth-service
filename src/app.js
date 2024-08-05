const express = require('express');
const path = require('path'); // Importa el módulo path
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const config = require('./config/config');

const app = express();

// Configura el directorio de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Define una ruta para servir el archivo login.html
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Define una ruta para servir el archivo protected.html
app.get('/protected', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'protected.html'));
});

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/', protectedRoutes);

mongoose.connect(config.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión a MongoDB:', err));

app.listen(config.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${config.PORT}`);
});
