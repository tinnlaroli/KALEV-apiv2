const express = require("express");
const router = express.Router();
const ActividadController = require("../controllers/actividadesController");
const validarToken = require("../middlewares/authMiddleware");

// Obtener todas las actividades
router.get("/", validarToken, ActividadController.obtenerTodas);

// Obtener una actividad por ID
router.get("/:id", validarToken, ActividadController.obtenerPorId);

// Obtener actividades asignadas a un estudiante
router.get(
  "/estudiante/:id_estudiante",
  validarToken,
  ActividadController.obtenerPorEstudiante
);

// Crear una nueva actividad
router.post("/", validarToken, ActividadController.crear);


// DELETE /actividades/:id - Eliminar una actividad por ID
router.delete("/:id", validarToken, ActividadController.eliminar);

// PUT /actividades/:id - Actualizar actividad por ID
router.put("/:id", validarToken, ActividadController.actualizar);


module.exports = router;
