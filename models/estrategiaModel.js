const pool = require('../config/db');

// Modelo para Estrategia
class Estrategia {
    // Obtener todas las estrategias de enseñanza
    static async getEstrategias() {
        const result = await pool.query('SELECT * FROM estrategias_ensenanza');
        return result.rows;
    }

    // Crear una nueva estrategia de enseñanza
    static async createEstrategia(data) {
        const { descripcion, estilo_asociado, id_tema } = data;
        const result = await pool.query(
            'INSERT INTO estrategias_ensenanza (descripcion, estilo_asociado, id_tema) VALUES ($1, $2, $3) RETURNING *;',
            [descripcion, estilo_asociado, id_tema]
        );
        return result.rows[0];
    }

    // Obtener detalles de una estrategia de enseñanza por ID
    static async getEstrategiaById(id_estrategia) {
        const result = await pool.query('SELECT * FROM estrategias_ensenanza WHERE id_estrategia = $1', [id_estrategia]);
        return result.rows[0];
    }
}

module.exports = Estrategia;
