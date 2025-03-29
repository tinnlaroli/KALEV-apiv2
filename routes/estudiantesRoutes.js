const express = require("express");
const router = express.Router();
const EstudianteController = require("../controllers/estudianteController");
const validarToken = require("../middlewares/authMiddleware");

// Obtener todos los estudiantes
router.get("/", validarToken, EstudianteController.obtenerTodos);

// Obtener un estudiante por ID
router.get("/:id", validarToken, EstudianteController.obtenerPorId);

// Obtener estudiantes por grupo
router.get(
  "/grupo/:id_grupo",
  validarToken,
  EstudianteController.obtenerPorGrupo
);

// Crear un nuevo estudiante
router.post("/", validarToken, EstudianteController.crear);

module.exports = router;
