const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

// Rutas GET
router.get('/user/:id', UserController.getUserById);
router.get('/student/:id', UserController.getStudentById);
router.get('/teacher/:id', UserController.getTeacherById);
router.get('/tutor/:id', UserController.getTutorById);
router.get('/director/:id', UserController.getDirectorById);

// Rutas PUT
router.put('/user/:id', UserController.updateUser);
router.put('/student/:id', UserController.updateStudent);
router.put('/teacher/:id', UserController.updateTeacher);
router.put('/tutor/:id', UserController.updateTutor);
router.put('/director/:id', UserController.updateDirector);

// Rutas POST
router.post('/user/', UserController.createUser);
router.post('/student/', UserController.createStudent);
router.post('/teacher/', UserController.createTeacher);
router.post('/tutor/', UserController.createTutor);
router.post('/director/', UserController.createDirector);
router.post('/login', UserController.loginUser);

module.exports = router;
