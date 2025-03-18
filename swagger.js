// Importa las dependencias necesarias
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configuración de la documentación de la API
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'API juegos',
            version: '1.0.0',
            description: 'Documentación de la API de juegos',
        },
        servers: [
            {
                url: "http://localhost:2000",
                description: "Servidor local",
            },
        ],
        components: {
            schemas: {
                Juego: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            description: "ID único del juego",
                        },
                        nombre: {
                            type: "string",
                            description: "Nombre del juego",
                        },
                        categoria: {
                            type: "string",
                            description: "Categoría del juego",
                        }
                    },
                },
                Metrica: {
                    type: "object",
                    properties: {
                        id_juego: { type: "string" },
                        id_jugador: { type: "string" },
                        puntuacion: { type: "integer" },
                        tiempo_empleado: { type: "string", format: "time" },
                        fecha_completado: { type: "string", format: "date" },
                        intentos: { type: "integer" },
                        progreso_porcentaje: { type: "number", format: "float" },
                    }
                },
                SesionJuego: {
                    type: "object",
                    properties: {
                        id_jugador: { type: "string" },
                        id_juego: { type: "string" },
                        fecha: { type: "string", format: "date-time" },
                        duracion_juego: { type: "string", format: "time" },
                        intentos: { type: "integer" },
                        monedas_ganadas: { type: "integer" }
                    }
                }
            }
        }
    },
    apis: ['./routes/*.js'],
};


// Genera la documentación de la API
const swaggerSpec = swaggerJsDoc(options);

const swaggerDocs = (app, port) => {
    // Ruta para acceder a la documentación de la API
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

// Exporta la función para que pueda ser utilizada en otros archivos
module.exports = swaggerJsDoc(options);