const express = require("express");
const router = express.Router();
const GrupoController = require("../controllers/grupoController");
const validarToken = require("../middlewares/authMiddleware");

// Rutas específicas primero
router.get(
  "/docente/:id_docente",
  validarToken,
  GrupoController.obtenerPorDocente
);
router.get(
  "/director/:id_director",
  validarToken,
  GrupoController.obtenerPorDirector
);
router.get("/grado/:grado", validarToken, GrupoController.obtenerPorGrado);

// Rutas generales
router.get("/", validarToken, GrupoController.obtenerTodos);
router.get("/:id", validarToken, GrupoController.obtenerPorId);
router.post("/", validarToken, GrupoController.crear);
router.put("/:id", validarToken, GrupoController.actualizar);
router.delete("/:id", validarToken, GrupoController.eliminar);

module.exports = router;
