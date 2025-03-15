const User = require('../models/userModel');

class UserController {

    static async findAllUsers(req, res) {
        try {
            const users = await User.findUser();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getUserById(req, res) {
        try {
            const user = await User.findUserById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getStudentById(req, res) {
        try {
            const student = await User.findStudentById(req.params.id);
            if (!student) {
                return res.status(404).json({ message: 'Student not found' });
            }
            res.json(student);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getTeacherById(req, res) {
        try {
            const teacher = await User.findTeacherById(req.params.id);
            if (!teacher) {
                return res.status(404).json({ message: 'Teacher not found' });
            }
            res.json(teacher);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getTutorById(req, res) {
        try {
            const tutor = await User.findTutorById(req.params.id);
            if (!tutor) {
                return res.status(404).json({ message: 'Tutor not found' });
            }
            res.json(tutor);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getDirectorById(req, res) {
        try {
            const director = await User.findDirectorById(req.params.id);
            if (!director) {
                return res.status(404).json({ message: 'Director not found' });
            }
            res.json(director);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async createUser(req, res) {
        try {
            const user = await User.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async createStudent(req, res) {
        try {
            const student = await User.createStudent(req.body);
            res.status(201).json(student);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async createTeacher(req, res) {
        try {
            const teacher = await User.createTeacher(req.body);
            res.status(201).json(teacher);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async createTutor(req, res) {
        try {
            const tutor = await User.createTutor(req.body);
            res.status(201).json(tutor);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async createDirector(req, res) {
        try {
            const director = await User.createDirector(req.body);
            res.status(201).json(director);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateUser(req, res) {
        try {
            const user = await User.updateUser(req.params.id, req.body);
            if (!user) {
                return res.status(404).json({ message: 'User not found or already deleted' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }


    static async loginUser(req, res) {
        const { correo, contrasenia } = req.body;
    
        if (!correo || !contrasenia) {
            return res.status(400).json({ message: 'Correo y contraseña son requeridos' });
        }
    
        try {
            const result = await User.loginUser({ correo, contrasenia });
            if (result.status === 200) {
                return res.status(200).json(result);
            }
            return res.status(result.status).json({ message: result.message });
        } catch (error) {
            console.error('Error en loginUser controller:', error);
            return res.status(500).json({ message: 'Error del servidor' });
        }
    }
    

    static async updateStudent(req, res) {
        try {
            const student = await User.updateStudent(req.params.id, req.body);
            if (!student) {
                return res.status(404).json({ message: 'Student not found or already deleted' });
            }
            res.json(student);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateTeacher(req, res) {
        try {
            const teacher = await User.updateTeacher(req.params.id, req.body);
            if (!teacher) {
                return res.status(404).json({ message: 'Teacher not found or already deleted' });
            }
            res.json(teacher);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateTutor(req, res) {
        try {
            const tutor = await User.updateTutor(req.params.id, req.body);
            if (!tutor) {
                return res.status(404).json({ message: 'Tutor not found or already deleted' });
            }
            res.json(tutor);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateDirector(req, res) {
        try {
            const director = await User.updateDirector(req.params.id, req.body);
            if (!director) {
                return res.status(404).json({ message: 'Director not found or already deleted' });
            }
            res.json(director);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = UserController;
