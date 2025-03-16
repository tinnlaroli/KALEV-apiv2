const { pool } = require("../config/db");

// Modelo para la tabla grupos
class GrupoModel {
  // Obtener todos los grupos

  /* la consulta funciona asi:
  g.*: selecciona todos los campos de la tabla grupos
  u1.nombre_usuario as nombre_docente: selecciona el campo nombre_usuario de la tabla usuarios y lo renombra a nombre_docente
  u1.ap_paterno as ap_paterno_docente: selecciona el campo ap_paterno de la tabla usuarios y lo renombra a ap_paterno_docente
  u2.nombre_usuario as nombre_director: selecciona el campo nombre_usuario de la tabla usuarios y lo renombra a nombre_director
  u2.ap_paterno as ap_paterno_director: selecciona el campo ap_paterno de la tabla usuarios y lo renombra a ap_paterno_director
   */
  static async obtenerTodos() {
    try {
      const query = `
        SELECT g.*, 
              u1.nombre_usuario as nombre_docente, 
              u1.ap_paterno as ap_paterno_docente,
              u2.nombre_usuario as nombre_director,
              u2.ap_paterno as ap_paterno_director
        FROM grupos g
        JOIN docentes d ON g.id_docente = d.id_docente
        JOIN usuarios u1 ON d.id_usuario = u1.id_usuario
        JOIN director dir ON g.id_director = dir.id_director
        JOIN usuarios u2 ON dir.id_usuario = u2.id_usuario
      `;
      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      console.error("Error al obtener todos los grupos:", error);
      throw error;
    }
  }

  // Obtener un grupo por su ID

  /* la consulta funciona asi:
  g.*: selecciona todos los campos de la tabla grupos
  u1.nombre_usuario as nombre_docente: selecciona el campo nombre_usuario de la tabla usuarios y lo renombra a nombre_docente
  u1.ap_paterno as ap_paterno_docente: selecciona el campo ap_paterno de la tabla usuarios y lo renombra a ap_paterno_docente
  u2.nombre_usuario as nombre_director: selecciona el campo nombre_usuario de la tabla usuarios y lo renombra a nombre_director
  u2.ap_paterno as ap_paterno_director: selecciona el campo ap_paterno de la tabla usuarios y lo renombra a ap_paterno_direct
   */
  static async obtenerPorId(id) {
    try {
      const query = `
        SELECT g.*, 
              u1.nombre_usuario as nombre_docente, 
              u1.ap_paterno as ap_paterno_docente,
              u2.nombre_usuario as nombre_director,
              u2.ap_paterno as ap_paterno_director
        FROM grupos g
        JOIN docentes d ON g.id_docente = d.id_docente
        JOIN usuarios u1 ON d.id_usuario = u1.id_usuario
        JOIN director dir ON g.id_director = dir.id_director
        JOIN usuarios u2 ON dir.id_usuario = u2.id_usuario
        WHERE g.id_grupo = $1
      `;
      const { rows } = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      console.error(`Error al obtener el grupo con ID ${id}:`, error);
      throw error;
    }
  }

  // Crear un nuevo grupo

  /* la consulta funciona asi:
  INSERT INTO grupos (nombre_grupo, id_docente, id_director, fecha_creacion, grado) : inserta los valores en la tabla grupos
  VALUES ($1, $2, $3, CURRENT_DATE, $4) : los valores que se insertaran en la tabla
  RETURNING *: retorna todos los campos de la tabla
   */
  static async crear(grupoData) {
    const { nombre_grupo, id_docente, id_director, grado } = grupoData;

    try {
      const query = `
        INSERT INTO grupos (nombre_grupo, id_docente, id_director, fecha_creacion, grado) 
        VALUES ($1, $2, $3, CURRENT_DATE, $4) 
        RETURNING *
      `;
      const { rows } = await pool.query(query, [
        nombre_grupo,
        id_docente,
        id_director,
        grado,
      ]);
      return rows[0];
    } catch (error) {
      console.error("Error al crear el grupo:", error);
      throw error;
    }
  }

  // Verificar si un docente existe

  /* la consulta funciona asi:
  SELECT id_docente FROM docentes WHERE id_docente = $1 : selecciona el campo id_docente de la tabla docentes donde id_docente sea igual a $1
   */
  static async verificarDocente(id_docente) {
    try {
      const { rows } = await pool.query(
        "SELECT id_docente FROM docentes WHERE id_docente = $1",
        [id_docente]
      );
      return rows.length > 0;
    } catch (error) {
      console.error(
        `Error al verificar el docente con ID ${id_docente}:`,
        error
      );
      throw error;
    }
  }

  // Verificar si un director existe

  /* la consulta funciona asi:
  SELECT id_director FROM director WHERE id_director = $1 : selecciona el campo id_director de la tabla director donde id_director sea igual a $1
   */
  static async verificarDirector(id_director) {
    try {
      const { rows } = await pool.query(
        "SELECT id_director FROM director WHERE id_director = $1",
        [id_director]
      );
      return rows.length > 0;
    } catch (error) {
      console.error(
        `Error al verificar el director con ID ${id_director}:`,
        error
      );
      throw error;
    }
  }
}

module.exports = GrupoModel;
