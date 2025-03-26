const express = require('express');
const router = express.Router();
const ItemsController = require('../controllers/itemsController');
const  validarToken  = require('../middlewares/authMiddleware');

// Obtener todos los ítems
router.get('/',  validarToken,ItemsController.obtenerTodos);

// Obtener un ítem por ID
router.get('/:id', validarToken, ItemsController.obtenerPorId);

// Crear un nuevo ítem
router.post('/', validarToken, ItemsController.crear);

module.exports = router;
