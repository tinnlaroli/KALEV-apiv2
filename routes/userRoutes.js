const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Registrar un nuevo usuario
router.post('/register', UserController.registrar);

// Iniciar sesión
router.post('/login', UserController.login);

// Obtener usuario por ID
router.get('/:id', UserController.obtenerPorId);

// Obtener usuarios por rol
router.get('/rol/:rol', UserController.obtenerPorRol);

// Actualizar usuario
router.put('/:id', UserController.actualizar);

module.exports = router;
