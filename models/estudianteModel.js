const { pool } = require("../config/db");

// Modelo para la gestión de estudiantes
class EstudianteModel {
  // Obtener todos los estudiantes

  /* la consulta funciona asi:
  *: selecciona todos los campos de la tabla estudiantes
  orderBy ap_paterno, nombre: ordena los resultados por ap_paterno y nombre
  */
  static async obtenerTodos() {
    try {
      const query = 'SELECT * FROM estudiantes ORDER BY ap_paterno, nombre';
      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Obtener un estudiante por ID
  /* la consulta funciona asi:
  *: selecciona todos los campos de la tabla estudiantes
  where id_estudiante = $1: selecciona el estudiante con el id que se le pase como parametro
  */
  static async obtenerPorId(id) {
    try {
      const query = 'SELECT * FROM estudiantes WHERE id_estudiante = $1';
      const { rows } = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Obtener estudiantes por grupo

  /* la consulta funciona asi:
  *: selecciona todos los campos de la tabla estudiantes
  where id_grupo = $1: selecciona los estudiantes que pertenezcan al grupo que se le pase como parametro
  orderBy ap_paterno, nombre: ordena los resultados por ap_paterno y nombre
  */
  static async obtenerPorGrupo(idGrupo) {  
    try {
      const query = 'SELECT * FROM estudiantes WHERE id_grupo = $1 ORDER BY ap_paterno, nombre';
      const { rows } = await pool.query(query, [idGrupo]);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Verificar si un grupo existe

  /* la consulta funciona asi:
  SELECT * FROM grupos: selecciona todos los campos de la tabla grupos
  WHERE id_grupo = $1: selecciona el grupo con el id que se le pase como parametro
  */
  static async verificarGrupoExiste(idGrupo) {  
    try {
      const query = 'SELECT * FROM grupos WHERE id_grupo = $1';
      const { rows } = await pool.query(query, [idGrupo]);
      return rows.length > 0;
    } catch (error) {
      throw error;
    }
  }
  
  // Crear un nuevo estudiante

  /* la consulta funciona asi:
  INSERT INTO estudiantes: inserta un nuevo registro en la tabla estudiantes
  (nombre, ap_paterno, ap_materno, fecha_nacimiento, correo, telefono, id_grupo): inserta los valores en la tabla estudiantes
  */
  static async crear(estudiante) {  
    try {
      const query = `
        INSERT INTO estudiantes 
        (nombre, ap_paterno, ap_materno, fecha_nacimiento, correo, telefono, id_grupo) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) 
        RETURNING *
      `;
      const values = [
        estudiante.nombre,
        estudiante.ap_paterno,
        estudiante.ap_materno,
        estudiante.fecha_nacimiento,
        estudiante.correo,
        estudiante.telefono,
        estudiante.id_grupo
      ];
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Actualizar un estudiante

  /* la consulta funciona asi:
  UPDATE estudiantes: actualiza un registro en la tabla estudiantes
  SET nombre = $1, ap_paterno = $2, ap_materno = $3, fecha_nacimiento = $4, correo = $5, telefono = $6, id_grupo = $7: actualiza los valores en la tabla estudiantes
  WHERE id_estudiante = $8: actualiza el registro con el id que se le pase como parametro
  RETURNING *: retorna todos los campos de la tabla
  */
  static async actualizar(id, estudiante) {
    try {
      const query = `
        UPDATE estudiantes 
        SET nombre = $1, ap_paterno = $2, ap_materno = $3, fecha_nacimiento = $4, 
        correo = $5, telefono = $6, id_grupo = $7
        WHERE id_estudiante = $8 
        RETURNING *
      `;
      const values = [
        estudiante.nombre,
        estudiante.ap_paterno,
        estudiante.ap_materno,
        estudiante.fecha_nacimiento,
        estudiante.correo,
        estudiante.telefono,
        estudiante.id_grupo,
        id
      ];
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Eliminar un estudiante

  /* la consulta funciona asi:
  DELETE FROM estudiantes: elimina un registro en la tabla estudiantes
  WHERE id_estudiante = $1: elimina el registro con el id que se le pase como parametro
  RETURNING *: retorna todos los campos de la tabla
  */
  static async eliminar(id) {
    try {
      const query = 'DELETE FROM estudiantes WHERE id_estudiante = $1 RETURNING *';
      const { rows } = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = EstudianteModel;