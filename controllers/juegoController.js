const { getJuegos, getJuegoById } = require('../models/Juego');

// Obtener todos los juegos disponibles
const obtenerJuegos = async (req, res) => {
  try {
    const juegos = await getJuegos();
    res.json(juegos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los juegos' });
  }
};

//Obtener un juego por su ID
const obtenerJuegoPorId = async (req, res) => {
    try {
        const { id_juego } = req.params;
        const juego = await getJuegoById(id_juego);

        if (!juego) {
            return res.status(404).json({ error: 'Juego no encontrado' });
        }
        res.json(juego);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el juego' });
    }
};


module.exports = {
  obtenerJuegos,
  obtenerJuegoPorId,
};