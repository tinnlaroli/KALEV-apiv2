const { getMetricasPorJugador, registrarMetricas } = require('../models/metrica');

//Registrar las métricas de un jugador en un juego
const registrarMetrica = async (req, res) => {
    try {
       const metrica = await registrarMetricas(req.body);
       res.json(metrica);
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar la métrica' });
    }
};

//Obtener las métricas de un jugador en un juego
const obtenerMetricasPorJugador = async (req, res) => {
    try {
        const { id_jugador } = req.params;
        const metricas = await getMetricasPorJugador(id_jugador);
        res.json(metricas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las métricas' });
    }
};

module.exports =  {
    registrarMetrica,
    obtenerMetricasPorJugador,
};