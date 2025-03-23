const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'KALEV API',
            version: '1.0.0',
            description: 'API para gestión de actividades',
        },
    },
    apis: ['./routes/*.js'],
};

module.exports = swaggerJsdoc(options);
