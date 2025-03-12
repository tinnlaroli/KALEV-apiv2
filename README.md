#### **Usuarios**
---
- **POST /usuarios/register**
    
    - **Descripción:** Registrar un nuevo usuario (alumno, docente, tutor, director).
    - **Cuerpo:** Datos del usuario (nombre, apellidos, correo, teléfono, rol, etc.).
- **POST /usuarios/login**
    
    - **Descripción:** Iniciar sesión con correo y contraseña.
    - **Cuerpo:** Correo y contraseña.
    - **Respuesta:** Token de autenticación (JWT).
- **GET /usuarios/{id}**
    
    - **Descripción:** Obtener los detalles de un usuario por su ID (alumno, docente, etc.).
    - **Parámetros:** `id` (ID del usuario).
- **PUT /usuarios/{id}**
    
    - **Descripción:** Actualizar la información del usuario (alumno, docente, etc.).
    - **Parámetros:** `id` (ID del usuario).
    - **Cuerpo:** Datos a actualizar (nombre, apellidos, correo, etc.).
- **GET /usuarios/rol/{rol}**
    
    - **Descripción:** Obtener una lista de usuarios por rol (por ejemplo, todos los alumnos o docentes).
    - **Parámetros:** `rol` (alumno, docente, tutor, director).

---