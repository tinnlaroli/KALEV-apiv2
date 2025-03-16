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
  u2.ap_paterno as ap_paterno_director: selecciona el campo ap_paterno de la tabla usuarios y lo renombra a ap_paterno_director
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

  // Actualizar un grupo existente
  /* la consulta funciona asi:docente
  Crear un array para almacenar las columnas a actualizar
  const updateColumns = [];
  const values = [];
  let paramCount = 1;
  Agregar cada campo proporcionado al array de columnas a actualizar
  Si no hay columnas para actualizar, retornar el grupo sin cambios
  Agregar el ID del grupo al array de valores
  Construir la consulta SQL
  UPDATE grupos
  SET ${updateColumns.join(', ')}
  WHERE id_grupo = $${paramCount}
  RETURNING *
   */
  static async actualizar(id, grupoData) {
    try {
      // Crear un array para almacenar las columnas a actualizar
      const updateColumns = [];
      const values = [];
      let paramCount = 1;

      // Agregar cada campo proporcionado al array de columnas a actualizar
      if (grupoData.nombre_grupo !== undefined) {
        updateColumns.push(`nombre_grupo = $${paramCount}`);
        values.push(grupoData.nombre_grupo);
        paramCount++;
      }

      if (grupoData.id_docente !== undefined) {
        updateColumns.push(`id_docente = $${paramCount}`);
        values.push(grupoData.id_docente);
        paramCount++;
      }

      if (grupoData.id_director !== undefined) {
        updateColumns.push(`id_director = $${paramCount}`);
        values.push(grupoData.id_director);
        paramCount++;
      }

      if (grupoData.grado !== undefined) {
        updateColumns.push(`grado = $${paramCount}`);
        values.push(grupoData.grado);
        paramCount++;
      }

      // Si no hay columnas para actualizar, retornar el grupo sin cambios
      if (updateColumns.length === 0) {
        return await this.obtenerPorId(id);
      }

      // Agregar el ID del grupo al array de valores
      values.push(id);

      // Construir la consulta SQL
      const query = `
        UPDATE grupos
        SET ${updateColumns.join(', ')}
        WHERE id_grupo = $${paramCount}
        RETURNING *
      `;

      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      console.error(`Error al actualizar el grupo con ID ${id}:`, error);
      throw error;
    }
  }

  // Eliminar un grupo
  /* la consulta funciona asi:
  DELETE FROM grupos WHERE id_grupo = $1 : elimina el grupo con id_grupo igual a $1
  RETURNING *: retorna todos los campos de la tabla
   */
  static async eliminar(id) {
    try {
      const query = `
        DELETE FROM grupos
        WHERE id_grupo = $1
        RETURNING *
      `;
      const { rows } = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      console.error(`Error al eliminar el grupo con ID ${id}:`, error);
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

  // Obtener grupos por docente
  /* la consulta funciona asi:
  SELECT g.*, : selecciona todos los campos de la tabla grupos
  u1.nombre_usuario as nombre_docente, : selecciona el campo nombre_usuario de la tabla usuarios y lo renombra a nombre_docente
  u1.ap_paterno as ap_paterno_docente, : selecciona el campo ap_paterno de la tabla usuarios y lo renombra a ap_paterno_docente
  u2.nombre_usuario as nombre_director, : selecciona el campo nombre_usuario de la tabla usuarios y lo renombra a nombre_director
  u2.ap_paterno as ap_paterno_director : selecciona el campo ap_paterno de la tabla usuarios y lo renombra a ap_paterno_director
   */
  static async obtenerPorDocente(id_docente) {
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
        WHERE g.id_docente = $1
      `;
      const { rows } = await pool.query(query, [id_docente]);
      return rows;
    } catch (error) {
      console.error(`Error al obtener grupos del docente con ID ${id_docente}:`, error);
      throw error;
    }
  }

  // Obtener grupos por director
  /* la consulta funciona asi:
  SELECT g.*, : selecciona todos los campos de la tabla grupos
  u1.nombre_usuario as nombre_docente, : selecciona el campo nombre_usuario de la tabla usuarios y lo renombra a nombre_docente
  u1.ap_paterno as ap_paterno_docente, : selecciona el campo ap_paterno de la tabla usuarios y lo renombra a ap_paterno_docente
  u2.nombre_usuario as nombre_director, : selecciona el campo nombre_usuario de la tabla usuarios y lo renombra a nombre_director
  u2.ap_paterno as ap_paterno_director : selecciona el campo ap_paterno de la tabla usuarios y lo renombra a ap_paterno_director
   */
  static async obtenerPorDirector(id_director) {
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
        WHERE g.id_director = $1
      `;
      const { rows } = await pool.query(query, [id_director]);
      return rows;
    } catch (error) {
      console.error(`Error al obtener grupos del director con ID ${id_director}:`, error);
      throw error;
    }
  }

  // Obtener grupos por grado
  /* la consulta funciona asi:
  SELECT g.*, : selecciona todos los campos de la tabla grupos
  u1.nombre_usuario as nombre_docente, : selecciona el campo nombre_usuario de la tabla usuarios y lo renombra a nombre_docente
  u1.ap_paterno as ap_paterno_docente, : selecciona el campo ap_paterno de la tabla usuarios y lo renombra a ap_paterno_docente
  u2.nombre_usuario as nombre_director, : selecciona el campo nombre_usuario de la tabla usuarios y lo renombra a nombre_director
  u2.ap_paterno as ap_paterno_director : selecciona el campo ap_paterno de la tabla usuarios y lo renombra a ap_paterno_director
   */
  static async obtenerPorGrado(grado) {
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
        WHERE g.grado = $1
      `;
      const { rows } = await pool.query(query, [grado]);
      return rows;
    } catch (error) {
      console.error(`Error al obtener grupos del grado ${grado}:`, error);
      throw error;
    }
  }
}

module.exports = GrupoModel;