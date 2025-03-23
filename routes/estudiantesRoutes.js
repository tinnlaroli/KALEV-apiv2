const express = require('express');
const router = express.Router();
const EstudianteController = require('../controllers/estudianteController');

// Obtener todos los estudiantes
router.get('/', EstudianteController.obtenerTodos);

// Obtener un estudiante por ID
router.get('/:id', EstudianteController.obtenerPorId);

// Obtener estudiantes por grupo
router.get('/grupo/:id_grupo', EstudianteController.obtenerPorGrupo);

// Crear un nuevo estudiante
router.post('/', EstudianteController.crear);

module.exports = router;
