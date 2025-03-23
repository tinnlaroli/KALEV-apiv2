require("dotenv").config();
const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction
    ? { rejectUnauthorized: false } // Railway y otros servicios necesitan SSL
    : false,
});

pool.on("error", (err) => {
  console.error("Error en la conexión con la base de datos:", err);
});

// Función opcional para verificar conexión
const testConnection = async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Conectado a la base de datos:", res.rows[0].now);
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
    throw error;
  }
};

module.exports = {
  pool,
  testConnection,
};
