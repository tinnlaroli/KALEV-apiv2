const express = require('express');
const cors = require('cors');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const comprasRoutes = require('./routes/compras');
const itemsRoutes = require('./routes/items'); // Asegúrate de que la ruta sea correcta

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Asegura que el servidor pueda manejar JSON en las solicitudes

// Middleware para Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rutas
app.use('/compras', comprasRoutes);
app.use('/items', itemsRoutes); // Asegúrate de que esta ruta esté definida correctamente

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Documentación disponible en http://localhost:${PORT}/api-docs`);
});
