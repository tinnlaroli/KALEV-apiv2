const { pool } = require("../config/db");

class CompraMascotaAaronModel {
  // Obtener la lista de ítems organizados por categoría
  static async obtenerTienda() {
    const query = "SELECT * FROM item ORDER BY categoria_items, nombre_item";
    const { rows } = await pool.query(query);
    return rows;
  }

  // Registrar una compra de ítem
  static async registrarCompra({ id_usuario, id_item, cantidad, costo_total }) {
    const query = `
      INSERT INTO compras (id_usuario, id_item, cantidad, costo_total, fecha_compra)
      VALUES ($1, $2, $3, $4, NOW()) RETURNING *;
    `;
    const values = [id_usuario, id_item, cantidad, costo_total];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  // Crear una nueva mascota
  static async crearMascota({ id_jugador, nombre_animal, tipo_animal }) {
    const query = `
      INSERT INTO animal (id_jugador, nombre_animal, tipo_animal)
      VALUES ($1, $2, $3) RETURNING *;
    `;
    const values = [id_jugador, nombre_animal, tipo_animal];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  // Aplicar decoración a una mascota, actualizando por categoría si ya existe
  static async aplicarDecoracion({ id_animal, id_item }) {
    // Obtener la categoría del ítem
    const itemQuery = "SELECT categoria_items FROM item WHERE id_item = $1";
    const { rows: itemRows } = await pool.query(itemQuery, [id_item]);
    if (itemRows.length === 0) throw new Error("Ítem no encontrado");
    const categoria = itemRows[0].categoria_items;

    const query = `
      INSERT INTO decoracion_aplicada (id_animal, id_item, categoria_items, fecha_aplicacion)
      VALUES ($1, $2, $3, NOW())
      ON CONFLICT (id_animal, categoria_items) 
      DO UPDATE SET id_item = EXCLUDED.id_item, fecha_aplicacion = NOW()
      RETURNING *;
    `;
    const values = [id_animal, id_item, categoria];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  // Obtener personalización activa de una mascota
  static async obtenerPersonalizacionMascota(id_animal) {
    const query = `
      SELECT 
        a.id_animal,
        a.nombre_animal,
        i.categoria_items,
        i.valor_aplicado
      FROM animal a
      LEFT JOIN decoracion_aplicada d ON a.id_animal = d.id_animal
      LEFT JOIN item i ON d.id_item = i.id_item
      WHERE a.id_animal = $1
    `;
    const { rows } = await pool.query(query, [id_animal]);
    if (rows.length === 0) return null;

    const { id_animal: id, nombre_animal } = rows[0];
    const personalizacion = {};

    rows.forEach(row => {
      if (row.categoria_items && row.valor_aplicado) {
        personalizacion[row.categoria_items] = row.valor_aplicado;
      }
    });

    return {
      id_animal: id,
      nombre_animal,
      personalizacion
    };
  }

  // Obtener una mascota y su personalización (detallado)
  static async obtenerMascota(id_animal) {
    return await this.obtenerPersonalizacionMascota(id_animal);
  }

  // Obtener todas las mascotas de un jugador
  static async obtenerMascotasPorJugador(id_jugador) {
    const query = "SELECT * FROM animal WHERE id_jugador = $1";
    const { rows } = await pool.query(query, [id_jugador]);
    return rows;
  }

  // Login de estudiante por código de juego
  static async login(correo, codigoJuego) {
    const result = await pool.query(
      `
      SELECT 
        e.id_estudiante, e.nombre, e.ap_paterno, e.ap_materno, e.correo,
        g.id_grupo, g.nombre_grupo, g.grado
      FROM estudiantes e
      INNER JOIN grupos g ON e.id_grupo = g.id_grupo
      INNER JOIN grupo_juego gj ON g.id_grupo = gj.id_grupo
      WHERE e.correo = $1 AND gj.codigo_juego = $2
    `,
      [correo, codigoJuego]
    );

    if (result.rows && result.rows[0]) {
      return result.rows[0];
    }
    return null;
  }
}

module.exports = CompraMascotaAaronModel;
