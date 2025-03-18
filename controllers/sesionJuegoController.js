const SesionJuego = require('../models/sesionJuego');

// Registrar una nueva sesión de juego
const registrarNuevaSesionJuego = async (req, res) => {
    try {
        const sesionJuego = await registrarSesionJuego();
        res.json(sesionJuego);
    }catch (error) {
        res.status(500).json({ error: 'Error al registrar la sesión de juego' });
    }
};

// Obtener todas las sesiones de juego de un jugador
const obtenerSesionesPorJugador = async (req, res) => {
    try {
        const { id_jugador } = req.params;
        const sesionJuego = await getSesionesPorJugador(id_jugador);
        
        if(!sesionJuego){
            return res.status(404).json({ error: 'Sesiones de juego no encontradas' });
        }
        res.json(sesionJuego);
    }catch (error) {
        res.status(500).json({ error: 'Error al obtener las sesiones de juego' });
    }

};

module.exports = {
    registrarNuevaSesionJuego,
    obtenerSesionesPorJugador,
};

