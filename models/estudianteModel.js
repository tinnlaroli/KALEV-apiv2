const {pool} = require("../config/db");

class EstudianteModel {
  // Obtener todos los estudiantes
  static async obtenerTodos() {
    try {
      const query = "SELECT * FROM estudiantes";
      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      console.error("Error al obtener estudiantes:", error);
      throw error;
    }
  }

  // Obtener estudiante por ID
  static async obtenerPorId(id) {
    try {
      const query = "SELECT * FROM estudiantes WHERE id_estudiante = $1";
      const { rows } = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      console.error(`Error al obtener el estudiante con ID ${id}:`, error);
      throw error;
    }
  }

  // Crear un nuevo estudiante
  static async crear(data) {
    const {
      nombre,
      ap_paterno,
      ap_materno = null,
      fecha_nacimiento,
      correo,
      telefono,
      id_grupo
    } = data;

    try {
      const query = `
        INSERT INTO estudiantes (
          nombre, ap_paterno, ap_materno, fecha_nacimiento,
          correo, telefono, id_grupo, fecha_registro
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP)
        RETURNING *
      `;
      const { rows } = await pool.query(query, [
        nombre,
        ap_paterno,
        ap_materno,
        fecha_nacimiento,
        correo,
        telefono,
        id_grupo
      ]);
      return rows[0];
    } catch (error) {
      console.error("Error al crear el estudiante:", error);
      throw error;
    }
  }

  // Obtener estudiantes por grupo
  static async obtenerPorGrupo(id_grupo) {
    try {
      const query = "SELECT * FROM estudiantes WHERE id_grupo = $1";
      const { rows } = await pool.query(query, [id_grupo]);
      return rows;
    } catch (error) {
      console.error(`Error al obtener estudiantes del grupo ${id_grupo}:`, error);
      throw error;
    }
  }
}

module.exports = EstudianteModel;
