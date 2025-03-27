const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const  validarToken  = require('../middlewares/authMiddleware');

// Registrar un nuevo usuario
router.post('/register', UserController.registrar);

// Iniciar sesión
router.post('/login', UserController.login);

// Obtener usuario por ID
router.get('/:id', validarToken, UserController.obtenerPorId);

// Obtener usuarios por rol
router.get('/rol/:id_rol', validarToken, UserController.obtenerPorRol);

// Actualizar usuario
router.put('/:id', validarToken, UserController.actualizar);

// Eliminar usuario
router.delete('/:id',validarToken, UserController.eliminar)

module.exports = router;
