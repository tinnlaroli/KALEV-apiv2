const jwt = require('jsonwebtoken');
const usuariosModel = require('../models/usuariosModels');
const validator = require('validator');


exports.register = async (req, res) => {
  try {
    const datos = req.body;
    if (!validator.isEmail(datos.correo)) {
      return res.status(400).json({ error: 'Correo no válido' });
    }
    const usuario = await usuariosModel.registerUsuario(datos);
    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { correo, contrasenia } = req.body;
    const usuario = await usuariosModel.loginUsuario(correo);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    const valido = await bcrypt.compare(contrasenia, usuario.contrasenia);
    if (!valido) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }
    const token = jwt.sign({ id: usuario.id_usuario, rol: usuario.id_rol }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getUsuario = async (req, res) => {
  try {
    const id = req.params.id;
    const usuario = await usuariosModel.getUsuarioById(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateUsuario = async (req, res) => {
  try {
    const id = req.params.id;
    const datos = req.body;
    const usuario = await usuariosModel.updateUsuario(id, datos);
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getUsuariosByRol = async (req, res) => {
  try {
    const rol = req.params.rol;
    const usuarios = await usuariosModel.getUsuariosByRol(rol);
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};