const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const juegoRoutes = require("./routes/juegoRoutes");
const metricaRoutes = require("./routes/metricaRoutes");
const sesionJuegoRoutes = require("./routes/sesionJuegoRoutes");

const app = express();

app.use(cors()); // Habilitar CORS
app.use(express.json()); // Habilitar el uso de JSON en las solicitudes

// Rutas
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/juegoRoutes', juegoRoutes);
app.use('/metricaRoutes', metricaRoutes);
app.use('/sesionJuegoRoutes', sesionJuegoRoutes);


// Puerto de escucha
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}/api-docs`);
});
