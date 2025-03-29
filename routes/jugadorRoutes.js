const express = require("express");
const router = express.Router();
const jugadorController = require("../controllers/jugadorController");

// CRUD jugador
router.post("/", jugadorController.crearJugador);
router.get("/", jugadorController.obtenerTodosJugadores);
router.get("/:id", jugadorController.obtenerJugadorPorId);
router.get(
  "/estudiante/:id_estudiante",
  jugadorController.obtenerJugadorPorEstudiante
);
router.put("/:id", jugadorController.actualizarJugador);
router.delete("/:id", jugadorController.eliminarJugador);

module.exports = router;
