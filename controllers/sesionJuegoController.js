const SesionJuego = require('../models/sesionJuego');

// Registrar una nueva sesión de juego
exports.registrarSesionJuego = async (req, res) => {
    try {
        const { id_jugador, id_juego, fecha, duracion_juego, intentos, monedas_ganadas } = req.body;
        try {
            const nuevaSesionJuego = new SesionJuego({
                id_jugador,
                id_juego,
                fecha,
                duracion_juego,
                intentos,
                monedas_ganadas
            });

            await nuevaSesionJuego.save();  // Corregido aquí
            res.status(201).json({ message: "Sesión de juego registrada exitosamente" });
        } catch (error) {
            res.status(500).json({ message: "Error al registrar la sesión de juego", error });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al registrar la sesión de juego", error });
    }
};

// Obtener todas las sesiones de juego de un jugador
exports.getSesionesJuegoByJugador = async (req, res) => {
    const { id_jugador } = req.params;
    try {
        const sesionesJuego = await SesionJuego.find({ id_jugador });
        if (!sesionesJuego.length) {
            return res.status(404).json({ message: "No se encontraron sesiones de juego para el jugador" });
        }
        res.json(sesionesJuego);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las sesiones de juego", error });
    }
};
