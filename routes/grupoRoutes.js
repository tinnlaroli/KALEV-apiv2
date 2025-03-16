const express = require('express');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const GrupoController = require('../controllers/grupoController');

// Cargar Swagger JSON
const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, '../swagger/swagger.json'), 'utf8'));

// Ruta de la documentación Swagger
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rutas de Grupos
router.get('/grupos', GrupoController.obtenerTodos);
router.get('/grupos/:id', GrupoController.obtenerPorId);
router.post('/grupos', GrupoController.crear);

module.exports = router;
