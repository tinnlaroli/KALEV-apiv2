const mongoose = require('mongoose');

// Definir el esquema del juego
const juegoSchema = new mongoose.Schema({
    nombre_juego: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    nivel: {
        type: Number,
        required: true,
    },
    id_materia: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Materia',
        required: true,
    },
    id_estilo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EstiloAprendizaje',
        required: true,
    }
});

module.exports = mongoose.model('Juego', juegoSchema);

