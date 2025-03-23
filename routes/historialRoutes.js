const express = require("express");
const router = express.Router();
const HistorialController = require("../controllers/historialController");

router.get("/:id_estudiante", HistorialController.obtenerPorEstudiante);
router.post("/", HistorialController.crear);

module.exports = router;
