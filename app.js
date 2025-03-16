// ### 2. Grupos y Estudiantes

//  GET /grupos  
//    Descripción: Obtener todos los grupos (para docentes o administradores).
//    Respuesta: Lista de grupos.

//  GET /grupos/{id}  
//    Descripción: Obtener detalles de un grupo específico.
//    Parámetros: id (ID del grupo).

//  POST /grupos  
//    Descripción: Crear un nuevo grupo (para administradores o docentes).
//    Cuerpo: Detalles del grupo (nombre, docente, director, grado).

//  GET /estudiantes/{id}  
//    Descripción: Obtener la información de un estudiante específico.
//    Parámetros: id (ID del estudiante).

//  POST /estudiantes  
//    Descripción: Registrar un nuevo estudiante.
//    Cuerpo: Información del estudiante (nombre, apellidos, grupo, correo, etc.).

//  GET /estudiantes/grupo/{id_grupo}  
//    Descripción: Obtener todos los estudiantes de un grupo específico.
//    Parámetros: id_grupo (ID del grupo).
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const { testConnection } = require('./config/db');
const grupoRoutes = require('./routes/grupoRoutes');

// Inicializar la aplicación
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cargar Swagger JSON
const swaggerFile = path.join(__dirname, './swagger/swagger.json'); // Ruta al archivo JSON
const swaggerData = fs.readFileSync(swaggerFile, 'utf8');
const swaggerDocument = JSON.parse(swaggerData);

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rutas
app.use('/api/v1/grupos', grupoRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: 'API de Gestión Educativa' });
});

// Iniciar el servidor
const iniciarServidor = async () => {
  try {
    // Probar la conexión a la base de datos
    await testConnection();
    
    // Iniciar el servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
      console.log(`Documentación disponible en: http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

iniciarServidor();

module.exports = app;
