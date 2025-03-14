const mongoose = require('mongoose');

const sesionJuegoSchema = new mongoose.Schema({
    id_jugador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jugador',
        required: true
    },
    id_juego: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Juego',
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    duracion_juego: {
        type: String,
        required: true
    },
    intentos: {
        type: Number,
        required: true
    },
    monedas_ganadas: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('SesionJuego', sesionJuegoSchema);