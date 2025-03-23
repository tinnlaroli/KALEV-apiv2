const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SALT_ROUNDS = 10;

class User {
    // Create User
    static async createUser(data) {
        const { nombre_usuario, ap_paterno, ap_materno, correo, contrasenia, telefono, id_rol } = data;
        const hashedPassword = await bcrypt.hash(contrasenia, SALT_ROUNDS);
        const result = await pool.query(
            'INSERT INTO usuarios (nombre_usuario, ap_paterno, ap_materno, correo, contrasenia, telefono, id_rol) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;',
            [nombre_usuario, ap_paterno, ap_materno, correo, hashedPassword, telefono, id_rol]
        );
        return result.rows[0];
    }

    // Create Student
    static async createStudent(data) {
        const { nombre, ap_paterno, ap_materno, fecha_nacimiento, correo, telefono, id_grupo } = data;
        const result = await pool.query(
            'INSERT INTO estudiantes (nombre, ap_paterno, ap_materno, fecha_nacimiento, correo, telefono, id_grupo) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;',
            [nombre, ap_paterno, ap_materno, fecha_nacimiento, correo, telefono, id_grupo]
        );
        return result.rows[0];
    }

    // Create Teacher
    static async createTeacher(data) {
        const { id_usuario } = data;
        const result = await pool.query('INSERT INTO docentes (id_usuario) VALUES ($1) RETURNING *;', [id_usuario]);
        return result.rows[0];
    }

    // Create Tutor
    static async createTutor(data) {
        const { id_usuario } = data;
        const result = await pool.query('INSERT INTO tutores (id_usuario) VALUES ($1) RETURNING *;', [id_usuario]);
        return result.rows[0];
    }

    // Create Director
    static async createDirector(data) {
        const { id_usuario, fecha_designacion } = data;
        const result = await pool.query(
            'INSERT INTO director (id_usuario, fecha_designacion) VALUES ($1, $2) RETURNING *;',
            [id_usuario, fecha_designacion]
        );
        return result.rows[0];
    }


    //Login
    static async loginUser(data) {
        const { correo, contrasenia } = data;
        
        try {
            
            const result = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);
            
            if (result.rows.length === 0) {
                return { status: 400, message: 'Usuario no encontrado' };
            }
    
            const user = result.rows[0];
            const isMatch = await bcrypt.compare(contrasenia, user.contrasenia);
    
            if (!isMatch) {
                return { status: 400, message: 'Contraseña incorrecta' };
            }
    
            const token = jwt.sign({ id: user.id_usuario }, process.env.JWT_SECRET, { expiresIn: '1h' });
            
            return {
                status: 200,
                message: 'Login exitoso',
                token,
                user: { id: user.id_usuario, correo: user.correo, rol: user.id_rol },
            };
        } catch (error) {
            console.error('Error en loginUser:', error);
            return { status: 500, message: 'Error del servidor' };
        }
    }


    static async findUser() {
        const result = await pool.query('SELECT * FROM usuarios');
        return result.rows[0];
    }
    // Get User by ID
    static async findUserById(id_usuario) {
        const result = await pool.query('SELECT * FROM usuarios WHERE id_usuario = $1', [id_usuario]);
        return result.rows[0];
    }

    // Get Student by ID
    static async findStudentById(id_estudiante) {
        const result = await pool.query('SELECT * FROM estudiantes WHERE id_estudiante = $1', [id_estudiante]);
        return result.rows[0];
    }

    // Get Teacher by ID
    static async findTeacherById(id_docente) {
        const result = await pool.query('SELECT * FROM docentes WHERE id_docente = $1', [id_docente]);
        return result.rows[0];
    }

    // Get Tutor by ID
    static async findTutorById(id_tutor) {
        const result = await pool.query('SELECT * FROM tutores WHERE id_tutor = $1', [id_tutor]);
        return result.rows[0];
    }

    // Get Director by ID
    static async findDirectorById(id_director) {
        const result = await pool.query('SELECT * FROM director WHERE id_director = $1', [id_director]);
        return result.rows[0];
    }



    // Update User
    static async updateUser(id_usuario, data) {
        const { nombre_usuario, ap_paterno, ap_materno, correo, contrasenia, telefono, id_rol } = data;
        let hashedPassword = contrasenia;
        if (contrasenia) {
            hashedPassword = await bcrypt.hash(contrasenia, SALT_ROUNDS);
        }
        const result = await pool.query(
            'UPDATE usuarios SET nombre_usuario = $1, ap_paterno = $2, ap_materno = $3, correo = $4, contrasenia = $5, telefono = $6, id_rol = $7 WHERE id_usuario = $8 RETURNING *;',
            [nombre_usuario, ap_paterno, ap_materno, correo, hashedPassword, telefono, id_rol, id_usuario]
        );
        return result.rows[0];
    }

    // Update Student
    static async updateStudent(id_estudiante, data) {
        const { nombre, ap_paterno, ap_materno, fecha_nacimiento, correo, telefono, id_grupo } = data;
        const result = await pool.query(
            'UPDATE estudiantes SET nombre = $1, ap_paterno = $2, ap_materno = $3, fecha_nacimiento = $4, correo = $5, telefono = $6, id_grupo = $7 WHERE id_estudiante = $8 RETURNING *;',
            [nombre, ap_paterno, ap_materno, fecha_nacimiento, correo, telefono, id_grupo, id_estudiante]
        );
        return result.rows[0];
    }

    // Update Teacher
    static async updateTeacher(id_docente, data) {
        const { id_usuario } = data;
        const result = await pool.query(
            'UPDATE docentes SET id_usuario = $1 WHERE id_docente = $2 RETURNING *;',
            [id_usuario, id_docente]
        );
        return result.rows[0];
    }

    // Update Tutor
    static async updateTutor(id_tutor, data) {
        const { id_usuario } = data;
        const result = await pool.query(
            'UPDATE tutores SET id_usuario = $1 WHERE id_tutor = $2 RETURNING *;',
            [id_usuario, id_tutor]
        );
        return result.rows[0];
    }

    // Update Director
    static async updateDirector(id_director, data) {
        const { id_usuario, fecha_designacion } = data;
        const result = await pool.query(
            'UPDATE director SET id_usuario = $1, fecha_designacion = $2 WHERE id_director = $3 RETURNING *;',
            [id_usuario, fecha_designacion, id_director]
        );
        return result.rows[0];
    }
}

module.exports = User;
