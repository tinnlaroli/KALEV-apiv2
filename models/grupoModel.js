const pool = require("../config/db");

class GrupoModel {
  // Obtener todos los grupos
  static async obtenerTodos() {
    try {
      const query = `
        SELECT g.*, 
              u1.nombre_usuario AS nombre_docente, 
              u1.ap_paterno AS ap_paterno_docente,
              u2.nombre_usuario AS nombre_director,
              u2.ap_paterno AS ap_paterno_director
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
  static async obtenerPorId(id) {
    try {
      const query = `
        SELECT g.*, 
              u1.nombre_usuario AS nombre_docente, 
              u1.ap_paterno AS ap_paterno_docente,
              u2.nombre_usuario AS nombre_director,
              u2.ap_paterno AS ap_paterno_director
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
  static async crear({ nombre_grupo, id_docente, id_director, grado }) {
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
        grado
      ]);
      return rows[0];
    } catch (error) {
      console.error("Error al crear el grupo:", error);
      throw error;
    }
  }

  // Actualizar grupo
  static async actualizar(id, grupoData) {
    try {
      const updateColumns = [];
      const values = [];
      let paramCount = 1;

      if (grupoData.nombre_grupo !== undefined) {
        updateColumns.push(`nombre_grupo = $${paramCount++}`);
        values.push(grupoData.nombre_grupo);
      }
      if (grupoData.id_docente !== undefined) {
        updateColumns.push(`id_docente = $${paramCount++}`);
        values.push(grupoData.id_docente);
      }
      if (grupoData.id_director !== undefined) {
        updateColumns.push(`id_director = $${paramCount++}`);
        values.push(grupoData.id_director);
      }
      if (grupoData.grado !== undefined) {
        updateColumns.push(`grado = $${paramCount++}`);
        values.push(grupoData.grado);
      }

      if (updateColumns.length === 0) {
        return await this.obtenerPorId(id);
      }

      values.push(id);

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

  // Eliminar grupo
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

  // Verificaciones
  static async verificarDocente(id_docente) {
    try {
      const { rows } = await pool.query(
        "SELECT id_docente FROM docentes WHERE id_docente = $1",
        [id_docente]
      );
      return rows.length > 0;
    } catch (error) {
      console.error(`Error al verificar docente con ID ${id_docente}:`, error);
      throw error;
    }
  }

  static async verificarDirector(id_director) {
    try {
      const { rows } = await pool.query(
        "SELECT id_director FROM director WHERE id_director = $1",
        [id_director]
      );
      return rows.length > 0;
    } catch (error) {
      console.error(`Error al verificar director con ID ${id_director}:`, error);
      throw error;
    }
  }

  // Filtros
  static async obtenerPorDocente(id_docente) {
    try {
      const query = `
        SELECT g.*, 
              u1.nombre_usuario AS nombre_docente, 
              u1.ap_paterno AS ap_paterno_docente,
              u2.nombre_usuario AS nombre_director,
              u2.ap_paterno AS ap_paterno_director
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

  static async obtenerPorDirector(id_director) {
    try {
      const query = `
        SELECT g.*, 
              u1.nombre_usuario AS nombre_docente, 
              u1.ap_paterno AS ap_paterno_docente,
              u2.nombre_usuario AS nombre_director,
              u2.ap_paterno AS ap_paterno_director
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

  static async obtenerPorGrado(grado) {
    try {
      const query = `
        SELECT g.*, 
              u1.nombre_usuario AS nombre_docente, 
              u1.ap_paterno AS ap_paterno_docente,
              u2.nombre_usuario AS nombre_director,
              u2.ap_paterno AS ap_paterno_director
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
