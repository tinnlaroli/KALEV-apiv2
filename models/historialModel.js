const pool = require('../config/db');

// Modelo para Historial
class Historial {
    // Obtener historial de recomendaciones de un estudiante
    static async getHistorialRecomendaciones(id_estudiante) {
        const result = await pool.query(
            'SELECT * FROM historial_recomendaciones WHERE id_estudiante = $1',
            [id_estudiante]
        );
        return result.rows;
    }

    // Registrar una recomendación para un estudiante
    static async createRecomendacion(data) {
        const { id_estudiante, id_tema, id_estrategia, efectividad } = data;
        const result = await pool.query(
            'INSERT INTO historial_recomendaciones (id_estudiante, id_tema, id_estrategia, efectividad) VALUES ($1, $2, $3, $4) RETURNING *;',
            [id_estudiante, id_tema, id_estrategia, efectividad]
        );
        return result.rows[0];
    }
}

module.exports = Historial;
