const mongoose = require('mongoose');

const metricaSchema = new mongoose.Schema({
    id_juego: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Juego',
        required: true
    },
    id_jugador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jugador',
        required: true
    },
    puntuacion: {
        type: Number,
        required: true
    },
    tiempo_empleado: {
        type: String,
        required: true
    },
    fecha_completado: {
        type: Date,
        required: true
    },
    intentos: {
        type: Number,
        required: true
    },
    progreso_porcentaje: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Metrica', metricaSchema);

