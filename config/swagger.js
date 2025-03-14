// Importa las dependencias necesarias
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configuración de la documentación de la API
const options = {
    definition: {
        openapi: "3.0.0", // Versión de OpenAPI utilizada
        info: {
            title: 'API juegos', // Nombre de la API
            version: '1.0.0', // Versión de la API
            description: 'Documentación de la API de juegos', // Descripción de la API
        },
        servers: [
            {
                url: "http://localhost:2000", // Servidor en el que corre la API
                description: "Servidor local",
            },
        ],
    },
    apis: ['./routes/*.js'], // Archivos donde se documentarán los endpoints
};

// Genera la documentación de la API
const swaggerSpec = swaggerJsDoc(options);

const swaggerDocs = (app, port) => {
    // Ruta para acceder a la documentación de la API
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

// Exporta la función para que pueda ser utilizada en otros archivos
module.exports = swaggerDocs ;