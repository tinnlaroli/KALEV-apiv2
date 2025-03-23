const UserModel = require('../models/userModel');

class UserController {
  // GET /usuarios/:id - Obtener usuario por ID
  static async obtenerPorId(req, res) {
    const { id } = req.params;
    try {
      const usuario = await UserModel.obtenerPorId(id);
      if (!usuario) {
        return res.status(404).json({
          success: false,
          message: `No se encontró el usuario con ID ${id}`
        });
      }
      return res.status(200).json({
        success: true,
        data: usuario,
        message: 'Usuario obtenido correctamente'
      });
    } catch (error) {
      console.error(`Error al obtener usuario con ID ${id}:`, error);
      return res.status(500).json({
        success: false,
        message: 'Error al obtener el usuario',
        error: error.message
      });
    }
  }

  // GET /usuarios/rol/:rol - Obtener usuarios por rol
  static async obtenerPorRol(req, res) {
    const { rol } = req.params;
    try {
      const usuarios = await UserModel.obtenerPorRol(rol);
      return res.status(200).json({
        success: true,
        data: usuarios,
        message: `Usuarios con rol ${rol} obtenidos correctamente`
      });
    } catch (error) {
      console.error(`Error al obtener usuarios por rol ${rol}:`, error);
      return res.status(500).json({
        success: false,
        message: 'Error al obtener los usuarios por rol',
        error: error.message
      });
    }
  }

  // POST /usuarios/register - Registrar nuevo usuario
  static async registrar(req, res) {
    const { nombre, apellidos, correo, telefono, rol, password } = req.body;

    if (!nombre || !apellidos || !correo || !telefono || !rol || !password) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son obligatorios: nombre, apellidos, correo, telefono, rol, password'
      });
    }

    try {
      const nuevoUsuario = await UserModel.registrar({
        nombre,
        apellidos,
        correo,
        telefono,
        rol,
        password
      });

      return res.status(201).json({
        success: true,
        data: nuevoUsuario,
        message: 'Usuario registrado correctamente'
      });
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      return res.status(500).json({
        success: false,
        message: 'Error al registrar el usuario',
        error: error.message
      });
    }
  }

  // POST /usuarios/login - Login con correo
  static async login(req, res) {
    const { correo, password } = req.body;

    if (!correo || !password) {
      return res.status(400).json({
        success: false,
        message: 'Correo y contraseña son obligatorios'
      });
    }

    try {
      const usuario = await UserModel.login(correo);
      if (!usuario || usuario.password !== password) {
        return res.status(401).json({
          success: false,
          message: 'Credenciales inválidas'
        });
      }

      // Aquí podrías agregar generación de JWT
      return res.status(200).json({
        success: true,
        data: usuario,
        message: 'Inicio de sesión exitoso'
      });
    } catch (error) {
      console.error('Error en login:', error);
      return res.status(500).json({
        success: false,
        message: 'Error en el inicio de sesión',
        error: error.message
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
        message: 'Debe proporcionar al menos un campo para actualizar'
      });
    }

    try {
      const usuarioExistente = await UserModel.obtenerPorId(id);
      if (!usuarioExistente) {
        return res.status(404).json({
          success: false,
          message: `No se encontró el usuario con ID ${id}`
        });
      }

      const usuarioActualizado = await UserModel.actualizar(id, data);
      return res.status(200).json({
        success: true,
        data: usuarioActualizado,
        message: 'Usuario actualizado correctamente'
      });
    } catch (error) {
      console.error(`Error al actualizar usuario con ID ${id}:`, error);
      return res.status(500).json({
        success: false,
        message: 'Error al actualizar el usuario',
        error: error.message
      });
    }
  }
}

module.exports = UserController;
