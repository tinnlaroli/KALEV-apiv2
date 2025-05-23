const { pool } = require("../config/db");

class ActividadModel {
  // Obtener todas las actividades
  static async obtenerTodas() {
    try {
      const query = "SELECT * FROM actividades";
      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      console.error("Error al obtener actividades:", error);
      throw error;
    }
  }

  // Obtener actividad por ID
  static async obtenerPorId(id) {
    try {
      const query = "SELECT * FROM actividades WHERE id_actividad = $1";
      const { rows } = await pool.query(query, [id]);
      return rows[0]; // Solo devolvemos el primer registro encontrado
    } catch (error) {
      console.error(`Error al obtener la actividad con ID ${id}:`, error);
      throw error;
    }
  }

  // Crear nueva actividad
  static async crear(data) {
    const { nombre_actividad, descripcion, fecha_inicio, fecha_fin, id_grupo } = data;

    try {
      const query = `
        INSERT INTO actividades (nombre_actividad, descripcion, fecha_inicio, fecha_fin, id_grupo)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *  
      `;
      const { rows } = await pool.query(query, [
        nombre_actividad,
        descripcion,
        fecha_inicio,
        fecha_fin,
        id_grupo,
      ]);
      return rows[0]; 
    } catch (error) {
      console.error("Error al crear la actividad:", error);
      throw error;
    }
  }

  // Obtener actividades por estudiante
  static async obtenerPorEstudiante(id_estudiante) {
    try {
      const query = `
        SELECT a.*
        FROM actividades a
        JOIN alumno_actividad aa ON a.id_actividad = aa.id_actividad
        WHERE aa.id_estudiante = $1
      `;
      const { rows } = await pool.query(query, [id_estudiante]);
      return rows;
    } catch (error) {
      console.error(`Error al obtener actividades del estudiante ${id_estudiante}:`, error);
      throw error;
    }
  }

  // Eliminar actividad por ID
  static async eliminar(id) {
    try {
      const query = "DELETE FROM actividades WHERE id_actividad = $1 RETURNING *";
      const { rows } = await pool.query(query, [id]);
      return rows[0];  // Retorna la actividad eliminada
    } catch (error) {
      console.error(`Error al eliminar la actividad con ID ${id}:`, error);
      throw error;
    }
  }

  // Actualizar actividad por ID
  static async actualizar(id, data) {
    const { nombre_actividad, descripcion, fecha_inicio, fecha_fin, id_grupo } = data;

    try {
      const query = `
        UPDATE actividades
        SET nombre_actividad = $1, descripcion = $2, fecha_inicio = $3, fecha_fin = $4, id_grupo = $5
        WHERE id_actividad = $6
        RETURNING *
      `;
      const { rows } = await pool.query(query, [
        nombre_actividad,
        descripcion,
        fecha_inicio,
        fecha_fin,
        id_grupo,
        id,
      ]);
      return rows[0];  // Retorna la actividad actualizada
    } catch (error) {
      console.error(`Error al actualizar la actividad con ID ${id}:`, error);
      throw error;
    }
  }
}

module.exports = ActividadModel;
