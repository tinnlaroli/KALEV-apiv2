const express = require('express');
const router = express.Router();
const GrupoController = require('../controllers/grupoController');

// Rutas específicas primero
router.get('/docente/:id_docente', GrupoController.obtenerPorDocente);
router.get('/director/:id_director', GrupoController.obtenerPorDirector);
router.get('/grado/:grado', GrupoController.obtenerPorGrado);

// Rutas generales
router.get('/', GrupoController.obtenerTodos);
router.get('/:id', GrupoController.obtenerPorId);
router.post('/', GrupoController.crear);
router.put('/:id', GrupoController.actualizar);
router.delete('/:id', GrupoController.eliminar);

module.exports = router;
