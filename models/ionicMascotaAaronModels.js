const pool = require('../config/db');

class CompraMascotaAaronModel {
  static async obtenerTienda() {
    const query = 'SELECT * FROM item ORDER BY categoria_items, nombre_item';
    const { rows } = await pool.query(query);
    return rows;
  }

  static async registrarCompra({ id_usuario, id_item, cantidad, costo_total }) {
    const query = `
      INSERT INTO compras (id_usuario, id_item, cantidad, costo_total, fecha_compra)
      VALUES ($1, $2, $3, $4, NOW()) RETURNING *;
    `;
    const values = [id_usuario, id_item, cantidad, costo_total];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async crearMascota({ id_jugador, nombre_animal, tipo_animal }) {
    const query = `
      INSERT INTO animal (id_jugador, nombre_animal, tipo_animal)
      VALUES ($1, $2, $3) RETURNING *;
    `;
    const values = [id_jugador, nombre_animal, tipo_animal];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async aplicarDecoracion({ id_animal, id_item }) {
    const query = `
      INSERT INTO decoracion_aplicada (id_animal, id_item, fecha_aplicacion)
      VALUES ($1, $2, NOW()) RETURNING *;
    `;
    const values = [id_animal, id_item];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async obtenerMascota(id_animal) {
    const query = `
      SELECT a.*, i.id_item, i.nombre_item, i.categoria_items, i.valor_aplicado
      FROM animal a
      LEFT JOIN decoracion_aplicada d ON d.id_animal = a.id_animal
      LEFT JOIN item i ON i.id_item = d.id_item
      WHERE a.id_animal = $1;
    `;
    const { rows } = await pool.query(query, [id_animal]);
    return rows;
  }

  static async obtenerMascotasPorJugador(id_jugador) {
    const query = 'SELECT * FROM animal WHERE id_jugador = $1';
    const { rows } = await pool.query(query, [id_jugador]);
    return rows;
  }
}

module.exports = CompraMascotaAaronModel;
