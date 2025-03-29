const { pool } = require('../config/db');

class JugadorModel {
  static async crearJugador(id_estudiante, alias) {
    const query = `
      INSERT INTO jugador (id_estudiante, alias)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [id_estudiante, alias]);
    return rows[0];
  }

  static async obtenerTodosJugadores() {
    const query = `
      SELECT * FROM jugador;
    `;
    const { rows } = await pool.query(query);
    return rows;
  }

  static async obtenerJugadorPorId(id_jugador) {
    const query = `
      SELECT * FROM jugador WHERE id_jugador = $1;
    `;
    const { rows } = await pool.query(query, [id_jugador]);
    return rows[0];
  }

  static async obtenerJugadorPorEstudiante(id_estudiante) {
    const query = `
      SELECT * FROM jugador WHERE id_estudiante = $1;
    `;
    const { rows } = await pool.query(query, [id_estudiante]);
    return rows[0];
  }

  static async actualizarJugador(id_jugador, alias) {
    const query = `
      UPDATE jugador SET alias = $1
      WHERE id_jugador = $2
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [alias, id_jugador]);
    return rows[0];
  }

  static async eliminarJugador(id_jugador) {
    const query = `
      DELETE FROM jugador WHERE id_jugador = $1 RETURNING *;
    `;
    const { rows } = await pool.query(query, [id_jugador]);
    return rows[0];
  }
}

module.exports = JugadorModel;
