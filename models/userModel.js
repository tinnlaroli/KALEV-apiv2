const { pool } = require("../config/db");

class UserModel {
  // Obtener usuario por ID
  static async obtenerPorId(id) {
    try {
      const query = "SELECT * FROM usuarios WHERE id_usuario = $1";
      const { rows } = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      console.error(`Error al obtener usuario con ID ${id}:`, error);
      throw error;
    }
  }

  // Obtener usuarios por rol
  static async obtenerPorRol(rol) {
    try {
      const query = "SELECT * FROM usuarios WHERE rol = $1";
      const { rows } = await pool.query(query, [rol]);
      return rows;
    } catch (error) {
      console.error(`Error al obtener usuarios con rol ${rol}:`, error);
      throw error;
    }
  }

  // Registrar nuevo usuario
  static async registrar(data) {
    const { nombre, apellidos, correo, telefono, rol, password } = data;

    try {
      const query = `
        INSERT INTO usuarios (nombre, apellidos, correo, telefono, rol, password)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
      `;
      const { rows } = await pool.query(query, [
        nombre,
        apellidos,
        correo,
        telefono,
        rol,
        password
      ]);
      return rows[0];
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      throw error;
    }
  }

  // Login por correo
  static async login(correo) {
    try {
      const query = "SELECT * FROM usuarios WHERE correo = $1";
      const { rows } = await pool.query(query, [correo]);
      return rows[0];
    } catch (error) {
      console.error(`Error al buscar usuario por correo ${correo}:`, error);
      throw error;
    }
  }

  // Actualizar usuario
  static async actualizar(id, data) {
    try {
      const updateColumns = [];
      const values = [];
      let paramCount = 1;

      for (const key in data) {
        updateColumns.push(`${key} = $${paramCount}`);
        values.push(data[key]);
        paramCount++;
      }

      if (updateColumns.length === 0) return await this.obtenerPorId(id);

      values.push(id);

      const query = `
        UPDATE usuarios
        SET ${updateColumns.join(", ")}
        WHERE id_usuario = $${paramCount}
        RETURNING *
      `;

      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      console.error(`Error al actualizar usuario con ID ${id}:`, error);
      throw error;
    }
  }
}

module.exports = UserModel;
