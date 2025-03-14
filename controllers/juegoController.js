const Juego = require('../models/Juego');

// Obtener todos los juegos disponibles
exports.getJuegos = async (req, res) => {
    try {
        const juegos = await Juego.find();
        res.json(juegos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener juegos", error });
    }
};

//Obtener un juego por su ID
exports.getJuegoById = async (req, res) => {
    const { id } = req.params;
    try {
        const juego = await Juego.findById(id);
        if (!juego) {
            return res.status(404).json({ message: "Juego no encontrado" });
        }
        res.json(juego);
    }catch (error) {
            res.status(500).json({ message: "Error al obtener el juego", error });
        }
    };
    