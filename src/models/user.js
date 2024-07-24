const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    dni: { type: String, required: true, unique: true },
    fechaNacimiento: { type: Date, required: true },
    email: { type: String, unique: true },
    telefono: { type: String, required: true },
    aptoFisico: { type: Boolean, required: true },
    roles: [{ type: String, enum: ['soporte', 'admin', 'empleado'], required: true }],
    activo: { type: Boolean, default: true },
    contraseña: { type: String, required: true }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;
