const Metrica = require('../models/metrica');

//Registrar las métricas de un jugador en un juego
exports.registrarMetrica = async (req, res) => {
    try {
        const { id_juego, id_jugador, puntuacion, tiempo_empleado, fecha_completado, intentos, progreso_porcentaje } = req.body;
        const nuevaMetrica = new Metrica({
            id_juego,
            id_jugador,
            puntuacion,
            tiempo_empleado,
            fecha_completado,
            intentos,
            progreso_porcentaje
        });

        await metrica.save();
        res.status(201).json({ message: "Métrica registrada exitosamente" });
    }catch (error) {
            res.status(500).json({ message: "Error al registrar la métrica", error });
        }
    };

    //Obtener las métricas de un jugador en un juego
    exports.getMetricasByJugador = async (req, res) => {
        const { id_jugador} = req.params;
        try {
            const metricas = await Metrica.find({ id_jugador});
            if (!metricas.length) {
                return res.status(404).json({ message: "No se encontraron métricas para el jugador" });
            }
            res.json(metricas);
        }catch (error) {
                res.status(500).json({ message: "Error al obtener las métricas", error });
            }
        };