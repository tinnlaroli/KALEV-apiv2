const express = require("express");
const router = express.Router();
const validarToken = require("../middlewares/authMiddleware");
const ActividadController = require("../controllers/actividadesController");

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

module.exports = router;

const ComprasController = require("../controllers/comprasController");

// Obtener todas las compras
router.get("/", validarToken, ComprasController.obtenerTodas);

// Obtener una compra por ID
router.get("/:id", validarToken, ComprasController.obtenerPorId);

// Registrar una nueva compra
router.post("/", validarToken, ComprasController.registrarCompra);

module.exports = router;

const EstrategiaController = require("../controllers/estrategiaController");

// Obtener todas las estrategias
router.get("/", validarToken, EstrategiaController.obtenerTodas);

// Obtener una estrategia por ID
router.get("/:id", validarToken, EstrategiaController.obtenerPorId);

// Crear una nueva estrategia
router.post("/", validarToken, EstrategiaController.crear);

module.exports = router;

const EstudianteController = require("../controllers/estudianteController");

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

const GrupoController = require("../controllers/grupoController");

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

const HistorialController = require("../controllers/historialController");

router.get(
  "/:id_estudiante",
  validarToken,
  HistorialController.obtenerPorEstudiante
);
router.post("/", validarToken, HistorialController.crear);

module.exports = router;

const {
  getTienda,
  registrarCompra,
  crearMascota,
  aplicarDecoracion,
  obtenerMascota,
  obtenerMascotasJugador,
  obtenerPersonalizacion,
  authController,
} = require("../controllers/ionicMascotaAaronControllers");

// Tienda
router.get("/tienda", getTienda);

// Compras
router.post("/comprasItems", registrarCompra);

// Mascotas
router.post("/mascotas", crearMascota);
router.get("/mascotas/:id", obtenerMascota);
router.get("/mascotas/jugador/:id_jugador", obtenerMascotasJugador);
router.get("/mascotas/:id/personalizacion", obtenerPersonalizacion); // 🆕
router.post("/mascotas/:id/aplicar-decoracion", aplicarDecoracion);

// Login de estudiante
router.post("/login-estudiante", authController.login);

module.exports = router;

const ItemsController = require("../controllers/itemsController");

// Obtener todos los ítems
router.get("/", validarToken, ItemsController.obtenerTodos);

// Obtener un ítem por ID
router.get("/:id", validarToken, ItemsController.obtenerPorId);

// Crear un nuevo ítem
router.post("/", validarToken, ItemsController.crear);

module.exports = router;

const JuegoController = require("../controllers/juegoController");

// Obtener todos los juegos
router.get("/", validarToken, JuegoController.obtenerTodos);

// Obtener un juego por ID
router.get("/:id", validarToken, JuegoController.obtenerPorId);

// Crear un nuevo juego
router.post("/", validarToken, JuegoController.crear);

module.exports = router;

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

const MetricaController = require("../controllers/metricaController");

// Obtener métricas por jugador
router.get("/:id_jugador", validarToken, MetricaController.obtenerPorJugador);

// Registrar nueva métrica
router.post("/", validarToken, MetricaController.crear);

module.exports = router;

const SesionJuegoController = require("../controllers/sesionJuegoController");

// Obtener todas las sesiones de un jugador
router.get(
  "/:id_jugador",
  validarToken,
  SesionJuegoController.obtenerPorJugador
);

// Registrar una nueva sesión de juego
router.post("/", validarToken, SesionJuegoController.crear);

module.exports = router;

const UserController = require("../controllers/userController");

// Registrar un nuevo usuario
router.post("/register", UserController.registrar);

// Iniciar sesión
router.post("/login", UserController.login);

// Obtener usuario por ID
router.get("/:id", validarToken, UserController.obtenerPorId);

// Obtener usuarios por rol
router.get("/rol/:id_rol", validarToken, UserController.obtenerPorRol);

// Actualizar usuario
router.put("/:id", validarToken, UserController.actualizar);

// Eliminar usuario
router.delete("/:id", validarToken, UserController.eliminar);

module.exports = router;
