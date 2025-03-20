const express = require('express');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const swaggerDocument = yaml.load('./docs/swagger.yaml');

const app = express();



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
    console.log('Documentación disponible en http://localhost:3000/api-docs');
});