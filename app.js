require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Client } = require('pg');  // Importamos el cliente de PostgreSQL
const usuariosRoutes = require('./routes/usuariosRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Conexión a PostgreSQL
const client = new Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT || 5432,
});



console.log({
  PG_USER: process.env.PG_USER,
  PG_HOST: process.env.PG_HOST,
  PG_DATABASE: process.env.PG_DATABASE,
  PG_PASSWORD: process.env.PG_PASSWORD,
  PG_PORT: process.env.PG_PORT,
});


client.connect()
  .then(() => console.log('Conexión exitosa a PostgreSQL'))
  .catch((err) => {
    console.error('Error al conectar:', err.message);
    console.error('Stack trace:', err.stack);
  });


// Rutas
app.use('/usuarios', usuariosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
