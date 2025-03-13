const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const pool = new Pool();


exports.registerUsuario = async (datos) => {
  const { nombre_usuario, ap_paterno, ap_materno, correo, contrasenia, telefono, id_rol } = datos;

  // Validación
  if (!contrasenia) {
    throw new Error('La contraseña no puede ser undefined o vacía');
  }

  // Hashear contraseña
  const hash = await bcrypt.hash(contrasenia, 10);

  // Consulta SQL
  const query = `INSERT INTO usuarios (nombre_usuario, ap_paterno, ap_materno, correo, contrasenia, telefono, id_rol) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`;
  const values = [nombre_usuario, ap_paterno, ap_materno, correo, hash, telefono, id_rol];
  const result = await pool.query(query, values);
  return result.rows[0];
};



exports.loginUsuario = async (correo) => {
  const query = `SELECT * FROM usuarios WHERE correo = $1;`;
  const result = await pool.query(query, [correo]);
  return result.rows[0];
};


exports.getUsuarioById = async (id) => {
  const query = `SELECT * FROM usuarios WHERE id_usuario = $1;`;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};


exports.updateUsuario = async (id, datos) => {
  const fields = Object.keys(datos).map((key, idx) => `${key} = $${idx + 2}`).join(", ");
  const values = [id, ...Object.values(datos)];
  const query = `UPDATE usuarios SET ${fields} WHERE id_usuario = $1 RETURNING *;`;
  const result = await pool.query(query, values);
  return result.rows[0];
};


exports.getUsuariosByRol = async (rol) => {
  const query = `SELECT * FROM usuarios WHERE id_rol = $1;`;
  const result = await pool.query(query, [rol]);
  return result.rows;
};