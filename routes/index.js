const express = require('express');
const router = express.Router();

// Importación de módulos de rutas
const userRoutes = require('./userRoutes');
const grupoRoutes = require('./gruposRoutes');
const estudianteRoutes = require('./estudiantesRoutes');
const actividadesRoutes = require('./actividadesRoutes');
const juegosRoutes = require('./juegosRoutes');
const metricasRoutes = require('./metricasRoutes');
const sesionJuegosRoutes = require('./sesionJuegosRoutes');
const comprasRoutes = require('./comprasRoutes');
const itemsRoutes = require('./itemsRoutes');
const estrategiasRoutes = require('./estrategiasRoutes');
const historialController = require('./historialRoutes');
const ionicMascotaAaronRoutes = require('./ionicMascotaAaronRoutes');

router.use('/usuarios', userRoutes);
router.use('/grupos', grupoRoutes);
router.use('/estudiantes', estudianteRoutes);
router.use('/actividades', actividadesRoutes);
router.use('/juegos', juegosRoutes);
router.use('/metricas', metricasRoutes);
router.use('/sesiones_juego', sesionJuegosRoutes);
router.use('/compras', comprasRoutes);
router.use('/items', itemsRoutes);
router.use('/estrategias_ensenanza', estrategiasRoutes);
router.use('/historial', historialController);
router.use('/', ionicMascotaAaronRoutes);

// Exportar el enrutador principal
module.exports = router;
