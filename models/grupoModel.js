const { pool } = require("../config/db");

// Modelo para la tabla grupos
class GrupoModel {
  // Obtener todos los grupos
  static async obtenerTodos() {
    try {
      /* consulta funciona asi
      el select g.* es para seleccionar todos los campos de la tabla grupos
      el join docentes d es para unir la tabla docentes con la tabla grupos
      el ON g.id_docente = d.id_docente es para unir los registros de las tablas docentes y grupos
      el join director dir es para unir la tabla director con la tabla grupos
      el ON g.id_director = dir.id_director es para unir los registros de las tablas director y grupos
      */
      const query = `
        SELECT g.*, 
              d.nombre as nombre_docente, 
              dir.nombre as nombre_director
        FROM grupos g
        JOIN docentes d ON g.id_docente = d.id_docente
        JOIN director dir ON g.id_director = dir.id_director
      `;
      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      console.error("Error al obtener todos los grupos:", error);
      throw error;
    }
  }

  // Obtener un grupo por su ID
  static async obtenerPorId(id) {
    try {
      /*consulta funciona asi
      el select g.* es para seleccionar todos los campos de la tabla grupos
      el join docentes d es para unir la tabla docentes con la tabla grupos
      el ON g.id_docente = d.id_docente es para unir los registros de las tablas docentes y grupos
      el join director dir es para unir la tabla director con la tabla grupos
      el ON g.id_director = dir.id_director es para unir los registros de las tablas director y grupos
      el WHERE g.id_grupo = $1 es para seleccionar el grupo con el id que se pasa como parametro
      */
      const query = `
        SELECT g.*, 
              d.nombre as nombre_docente, 
              dir.nombre as nombre_director
        FROM grupos g
        JOIN docentes d ON g.id_docente = d.id_docente
        JOIN director dir ON g.id_director = dir.id_director
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
  static async crear(grupoData) {
    const { nombre_grupo, id_docente, id_director, grado } = grupoData;

    try {
      /*consulta funciona asi
      el INSERT INTO grupos es para insertar un nuevo registro en la tabla grupos
      el nombre_grupo, id_docente, id_director, fecha_creacion, grado son los campos que se van a insertar
      el VALUES ($1, $2, $3, CURRENT_DATE, $4) son los valores que se van a insert
      el RETURNING * es para retornar el registro que se acaba de insertar
      */
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
  static async verificarDocente(id_docente) {
    try {
      /* consulta funciona asi
      el SELECT id_docente FROM docentes es para seleccionar el campo id_docente de la tabla docentes
      el WHERE id_docente = $1 es para seleccionar el docente con el id que se pasa como parametro
      */
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
  static async verificarDirector(id_director) {
    try { 
      /* consulta funciona asi
      el SELECT id_director FROM director es para seleccionar el campo id_director de la tabla director
      el WHERE id_director = $1 es para seleccionar el director con el id que se pasa como parametro
      */
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
