const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosControllers');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', usuariosController.register);
router.post('/login', usuariosController.login);
router.get('/:id', authMiddleware, usuariosController.getUsuario);
router.put('/:id', authMiddleware, usuariosController.updateUsuario);
router.get('/rol/:rol', authMiddleware, usuariosController.getUsuariosByRol);

module.exports = router;