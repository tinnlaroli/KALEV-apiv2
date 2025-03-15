
const pool = require('../config/db');

const getActividades = async () => {
    const result = await pool.query('SELECT * FROM actividades');
    return result.rows;
};

const getActividadById = async (id) => {
    const result = await pool.query('SELECT * FROM actividades WHERE id_actividad = $1', [id]);
    return result.rows[0]; // Retorna solo un objeto en lugar de un array
};

const crearActividad = async (nombre, descripcion, fecha_inicio, fecha_fin, id_grupo) => {
    const result = await pool.query(
        `INSERT INTO actividades (nombre_actividad, descripcion, fecha_inicio, fecha_fin, id_grupo) 
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [nombre, descripcion, fecha_inicio, fecha_fin, id_grupo]
    );
    return result.rows[0]; // Retorna la actividad recién creada.
};

module.exports = { getActividades, getActividadById, crearActividad };

