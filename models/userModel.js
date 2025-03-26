const {pool} = require("../config/db");

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
  static async obtenerPorRol(id_rol) {
    try {
      const query = "SELECT * FROM usuarios WHERE id_rol = $1";
      const { rows } = await pool.query(query, [id_rol]);
      return rows;
    } catch (error) {
      console.error(`Error al obtener usuarios con id_rol ${id_rol}:`, error);
      throw error;
    }
  }

  // Registrar nuevo usuario
  static async registrar(data) {
    const {
      nombre_usuario,
      ap_paterno,
      ap_materno,
      correo,
      telefono,
      id_rol,
      contrasenia
    } = data;

    try {
      const query = `
        INSERT INTO usuarios (
          nombre_usuario,
          ap_paterno,
          ap_materno,
          correo,
          telefono,
          id_rol,
          contrasenia
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
      `;
      const { rows } = await pool.query(query, [
        nombre_usuario,
        ap_paterno,
        ap_materno || null,
        correo,
        telefono,
        id_rol,
        contrasenia
      ]);
      return rows[0];
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      throw error;
    }
  }

  // Login por correo
  static async login(req, res) {
    const { correo, contrasenia } = req.body;
  
    if (!correo || !contrasenia) {
      return res.status(400).json({
        success: false,
        message: "Correo y contraseña son obligatorios",
      });
    }
  
    try {
      const usuario = await UserModel.login(correo);
  
      if (!usuario || usuario.contrasenia !== contrasenia) {
        return res.status(401).json({
          success: false,
          message: "Credenciales inválidas",
        });
      }
  
      const payload = {
        id_usuario: usuario.id_usuario,
        correo: usuario.correo,
        rol: usuario.id_rol
      };
  
      const token = generarToken(payload);
  
      return res.status(200).json({
        success: true,
        message: "Inicio de sesión exitoso",
        token,
        usuario
      });
    } catch (error) {
      console.error("Error en login:", error);
      return res.status(500).json({
        success: false,
        message: "Error en el inicio de sesión",
        error: error.message,
      });
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
