const express = require('express');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();
const port = 3000;

// Middlewares
app.use(express.json());
app.use(cors());

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "KALEV API",
      version: "1.0.0",
      description: "API para gestionar compras y artículos"
    }
  },
  apis: ["./swagger/*.js"]
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas
const comprasRoutes = require('./routes/comprasRoutes');
const itemsRoutes = require('./routes/itemsRoutes');
app.use('/compras', comprasRoutes);
app.use('/items', itemsRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});