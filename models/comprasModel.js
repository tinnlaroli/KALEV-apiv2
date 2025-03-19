const db = require('../config/db');

const getCompras = async () => {
    const result = await pool.query('SELECT * FROM compras;');
    return result.rows;
};

module.exports = { getCompras };
