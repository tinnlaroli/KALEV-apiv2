const express = require('express');
const { obtenerActividades, obtenerActividadPorId, crearActividadController, obtenerActividadesPorEstudiante, asignarActividad } = require('../controllers/actividadesController');
const router = express.Router();

/**
 * @swagger
 * /actividades:
 *   get:
 *     summary: Obtener todas las actividades
 *     description: Devuelve una lista de todas las actividades registradas en la base de datos.
 *     responses:
 *       200:
 *         description: Lista de actividades obtenida correctamente.
 *       500:
 *         description: Error en el servidor.
 */
router.get('/', obtenerActividades);

/**
 * @swagger
 * /actividades/{id}:
 *   get:
 *     summary: Obtener detalles de una actividad específica
 *     description: Devuelve los detalles de una actividad específica según su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la actividad a obtener.
 *     responses:
 *       200:
 *         description: Actividad obtenida correctamente.
 *       404:
 *         description: Actividad no encontrada.
 *       500:
 *         description: Error en el servidor.
 */
router.get('/:id', obtenerActividadPorId);

/**
 * @swagger
 * /actividades:
 *   post:
 *     summary: Crear una nueva actividad
 *     description: Agrega una nueva actividad a la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Revisión de código"
 *               descripcion:
 *                 type: string
 *                 example: "Evaluar la calidad del código en el sprint actual"
 *               fecha_inicio:
 *                 type: string
 *                 format: date
 *                 example: "2025-03-20"
 *               fecha_fin:
 *                 type: string
 *                 format: date
 *                 example: "2025-03-25"
 *               id_grupo:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Actividad creada exitosamente.
 *       400:
 *         description: Datos inválidos o incompletos.
 *       500:
 *         description: Error en el servidor.
 */
router.post('/', crearActividadController);

/**
 * @swagger
 * /actividades/estudiante/{id_estudiante}:
 *   get:
 *     summary: Obtener todas las actividades asignadas a un estudiante
 *     description: Devuelve todas las actividades asignadas a un estudiante en particular, basado en su ID.
 *     parameters:
 *       - in: path
 *         name: id_estudiante
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del estudiante para obtener sus actividades.
 *     responses:
 *       200:
 *         description: Lista de actividades obtenida correctamente.
 *       404:
 *         description: No se encontraron actividades para este estudiante.
 *       500:
 *         description: Error en el servidor.
 */
router.get('/estudiante/:id_estudiante', obtenerActividadesPorEstudiante);

/**
 * @swagger
 * /alumno_actividad:
 *   post:
 *     summary: Asignar una actividad a un estudiante
 *     description: Asigna una actividad específica a un estudiante y guarda la información relacionada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_estudiante:
 *                 type: integer
 *                 description: ID del estudiante al que se le asignará la actividad.
 *               id_actividad:
 *                 type: integer
 *                 description: ID de la actividad que se asignará.
 *               id_materia:
 *                 type: integer
 *                 description: ID de la materia relacionada con la actividad.
 *               estado:
 *                 type: string
 *                 description: Estado de la actividad (por ejemplo, "en progreso", "completada").
 *               calificacion:
 *                 type: float
 *                 description: Calificación obtenida por el estudiante en la actividad.
 *     responses:
 *       201:
 *         description: Actividad asignada correctamente al estudiante.
 *       400:
 *         description: Faltan datos necesarios en el cuerpo de la solicitud.
 *       500:
 *         description: Error en el servidor.
 */
router.post('/', asignarActividad )

module.exports = router;
