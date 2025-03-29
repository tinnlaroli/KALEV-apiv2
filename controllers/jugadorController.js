const JugadorModel = require('../models/jugadorModel');

const jugadorController = {
  async crearJugador(req, res) {
    try {
      const { id_estudiante, alias } = req.body;
      const nuevoJugador = await JugadorModel.crearJugador(id_estudiante, alias);
      res.status(201).json(nuevoJugador);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear jugador', detalle: error.message });
    }
  },

  async obtenerTodosJugadores(req, res) {
    try {
      const jugadores = await JugadorModel.obtenerTodosJugadores();
      res.json(jugadores);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener jugadores', detalle: error.message });
    }
  },

  async obtenerJugadorPorId(req, res) {
    try {
      const { id } = req.params;
      const jugador = await JugadorModel.obtenerJugadorPorId(id);
      if (!jugador) return res.status(404).json({ error: 'Jugador no encontrado' });
      res.json(jugador);
    } catch (error) {
      res.status(500).json({ error: 'Error al buscar jugador', detalle: error.message });
    }
  },

  async obtenerJugadorPorEstudiante(req, res) {
    try {
      const { id_estudiante } = req.params;
      const jugador = await JugadorModel.obtenerJugadorPorEstudiante(id_estudiante);
      if (!jugador) return res.status(404).json({ error: 'Jugador no encontrado' });
      res.json(jugador);
    } catch (error) {
      res.status(500).json({ error: 'Error al buscar jugador', detalle: error.message });
    }
  },

  async actualizarJugador(req, res) {
    try {
      const { id } = req.params;
      const { alias } = req.body;
      const jugador = await JugadorModel.actualizarJugador(id, alias);
      res.json(jugador);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar jugador', detalle: error.message });
    }
  },

  async eliminarJugador(req, res) {
    try {
      const { id } = req.params;
      const jugador = await JugadorModel.eliminarJugador(id);
      res.json(jugador);
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar jugador', detalle: error.message });
    }
  }
};

module.exports = jugadorController;
