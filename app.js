require('dotenv').config();
const express = require("express");
const connectDB = require("./config/db");
const swaggerDocs = require("./config/swagger");
const cors = require("cors");

const app = express();

connectDB();

app.use(cors()); // Habilitar CORS
app.use(express.json()); // Habilitar el uso de JSON en las solicitudes
swaggerDocs(app); // Inicializar Swagger

// Rutas
app.use("/api/juegos", require("./routes/juegoRoutes"));
app.use("/api/metricas", require("./routes/metricaRoutes"));
app.use("/api/sesiones", require("./routes/sesionJuegoRoutes"));

// Puerto de escucha
const PORT = process.env.PORT || 2000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}/api-docs`);
});
