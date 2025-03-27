const UserModel = require("../models/userModel");
const { generarToken } = require("../utils/jwt");
class UserController {
  // GET /usuarios/:id - Obtener usuario por ID
  static async obtenerPorId(req, res) {
    const { id } = req.params;
    try {
      const usuario = await UserModel.obtenerPorId(id);
      if (!usuario) {
        return res.status(404).json({
          success: false,
          message: `No se encontró el usuario con ID ${id}`,
        });
      }
      return res.status(200).json({
        success: true,
        data: usuario,
        message: "Usuario obtenido correctamente",
      });
    } catch (error) {
      console.error(`Error al obtener usuario con ID ${id}:`, error);
      return res.status(500).json({
        success: false,
        message: "Error al obtener el usuario",
        error: error.message,
      });
    }
  }

  // GET /usuarios/rol/:id_rol - Obtener usuarios por ID de rol
  static async obtenerPorRol(req, res) {
    const { id_rol } = req.params;
    try {
      const usuarios = await UserModel.obtenerPorRol(id_rol);
      return res.status(200).json({
        success: true,
        data: usuarios,
        message: `Usuarios con id_rol ${id_rol} obtenidos correctamente`,
      });
    } catch (error) {
      console.error(`Error al obtener usuarios por id_rol ${id_rol}:`, error);
      return res.status(500).json({
        success: false,
        message: "Error al obtener los usuarios por id_rol",
        error: error.message,
      });
    }
  }

  // POST /usuarios/register - Registrar nuevo usuario
  static async registrar(req, res) {
    const {
      nombre_usuario,
      ap_paterno,
      ap_materno,
      correo,
      telefono,
      id_rol,
      contrasenia,
    } = req.body;

    if (
      !nombre_usuario ||
      !ap_paterno ||
      !correo ||
      !telefono ||
      !id_rol ||
      !contrasenia
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Todos los campos obligatorios: nombre_usuario, ap_paterno, correo, telefono, id_rol, contrasenia",
      });
    }

    try {
      const nuevoUsuario = await UserModel.registrar({
        nombre_usuario,
        ap_paterno,
        ap_materno,
        correo,
        telefono,
        id_rol,
        contrasenia,
      });

      return res.status(201).json({
        success: true,
        data: nuevoUsuario,
        message: "Usuario registrado correctamente",
      });
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      return res.status(500).json({
        success: false,
        message: "Error al registrar el usuario",
        error: error.message,
      });
    }
  }

  // POST /usuarios/login - Login con correo
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
        rol: usuario.id_rol,
      };

      const token = generarToken(payload);

      return res.status(200).json({
        success: true,
        message: "Inicio de sesión exitoso",
        token,
        usuario,
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

  // PUT /usuarios/:id - Actualizar usuario
  static async actualizar(req, res) {
    const { id } = req.params;
    const data = req.body;

    if (Object.keys(data).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Debe proporcionar al menos un campo para actualizar",
      });
    }

    try {
      const usuarioExistente = await UserModel.obtenerPorId(id);
      if (!usuarioExistente) {
        return res.status(404).json({
          success: false,
          message: `No se encontró el usuario con ID ${id}`,
        });
      }

      const usuarioActualizado = await UserModel.actualizar(id, data);
      return res.status(200).json({
        success: true,
        data: usuarioActualizado,
        message: "Usuario actualizado correctamente",
      });
    } catch (error) {
      console.error(`Error al actualizar usuario con ID ${id}:`, error);
      return res.status(500).json({
        success: false,
        message: "Error al actualizar el usuario",
        error: error.message,
      });
    }
  }

  static async eliminar(req, res) {
    const { id } = req.params;

    try {
      const usuarioExistente = await UserModel.obtenerPorId(id);
      if (!usuarioExistente) {
        return res.status(404).json({
          success: false,
          message: `No se encontró el usuario con ID ${id}`,
        });
      }

      await UserModel.eliminar(id);
      return res.status(200).json({
        success: true,
        message: "Usuario eliminado correctamente",
      });
    } catch (error) {
      console.error(`Error al eliminar usuario con ID ${id}:`, error);
      return res.status(500).json({
        success: false,
        message: "Error al eliminar el usuario",
        error: error.message,
      });
    }
  }
}

module.exports = UserController;
