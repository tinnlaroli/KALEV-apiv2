const express = require('express');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const EstudianteController = require('../controllers/estudianteController');

// Cargar Swagger JSON
try {
  const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, '../swagger/swagger.json'), 'utf8'));
  
  // Ruta de la documentación Swagger
  router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (error) {
  console.error('Error al cargar el archivo swagger.json:', error);
}

// Rutas de Estudiantes
router.get('/', EstudianteController.getAllEstudiantes);
router.get('/:id', EstudianteController.getEstudianteById);
router.get('/grupo/:id_grupo', EstudianteController.getEstudiantesByGrupo);
router.post('/', EstudianteController.createEstudiante);
router.put('/:id', EstudianteController.updateEstudiante);
router.delete('/:id', EstudianteController.deleteEstudiante);
module.exports = router;