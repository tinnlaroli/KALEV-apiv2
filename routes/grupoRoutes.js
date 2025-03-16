const express = require('express');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const GrupoController = require('../controllers/grupoController');

// Cargar Swagger JSON
try {
  const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, '../swagger/swagger.json'), 'utf8'));
  
  // Ruta de la documentación Swagger
  router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (error) {
  console.error('Error al cargar el archivo swagger.json:', error);
}

// Rutas de Grupos
router.get('/', GrupoController.obtenerTodos);
router.get('/:id', GrupoController.obtenerPorId);
router.post('/', GrupoController.crear);

module.exports = router;