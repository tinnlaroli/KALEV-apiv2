const pool = require('../config/db');

const getTienda = async (req, res) => {
  try {
    const query = `
      SELECT * FROM item
      ORDER BY categoria_items, nombre_item;
    `;
    const { rows } = await pool.query(query);

    // Agrupar por categoría
    const grouped = rows.reduce((acc, item) => {
      if (!acc[item.categoria_items]) acc[item.categoria_items] = [];
      acc[item.categoria_items].push(item);
      return acc;
    }, {});

    res.status(200).json(grouped);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la tienda' });
  }
};

module.exports = { getTienda };
