const express = require('express');
const cors = require('cors');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const comprasRoutes = require('./routes/compras'); 
const itemsRoutes = require('./routes/items'); // Importamos la nueva ruta

const app = express();

// Habilitar CORS
app.use(cors());

// Middleware para Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rutas
app.use('/compras', comprasRoutes);
app.use('/items', itemsRoutes); // Agregamos la nueva ruta aquí

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Documentación disponible en http://localhost:${PORT}/api-docs`);
});
