const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const { testConnection } = require("./config/db");
const rutas = require("./routes");

// Inicializar la aplicación
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Documentación Swagger
const swaggerFilePath = path.join(__dirname, "./swagger/swagger.json");
const swaggerData = fs.readFileSync(swaggerFilePath, "utf8");
const swaggerDocument = JSON.parse(swaggerData);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rutas de la API
app.use("/api/v1", rutas); // todas las rutas se cargan aquí

// Ruta raíz
app.get("/", (req, res) => {
  res.json({ mensaje: "API de KALEV funcionando correctamente" });
});

// Iniciar el servidor
const iniciarServidor = async () => {
  try {
    await testConnection();
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
      console.log(`Swagger: http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
    process.exit(1);
  }
};

iniciarServidor();

module.exports = app;
