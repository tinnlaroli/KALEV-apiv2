# API de Gestión de Usuarios

Esta es una API RESTful para gestionar usuarios, estudiantes, docentes, tutores y directores. Proporciona operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para cada entidad, así como un sistema de autenticación basado en JWT.

## Características

- **Gestión de Usuarios**: Crear, obtener, actualizar y eliminar usuarios.
- **Gestión de Estudiantes**: Crear, obtener, actualizar y eliminar estudiantes.
- **Gestión de Docentes**: Crear, obtener, actualizar y eliminar docentes.
- **Gestión de Tutores**: Crear, obtener, actualizar y eliminar tutores.
- **Gestión de Directores**: Crear, obtener, actualizar y eliminar directores.
- **Autenticación**: Sistema de login con JWT para proteger las rutas.

## Requisitos

- Node.js (v14 o superior)
- PostgreSQL (v12 o superior)
- npm (v6 o superior)

## Instalación

1. Clona el repositorio:
   git clone git clone https://github.com/aaronDevCode/KalevApi.git
   cd KalevApi

2. Instala las dependencias:

   npm install

3. Configura las variables de entorno:

   Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes variables:

   PG_USER=postgres
   PG_HOST=localhost
   PG_DATABASE=kalev
   PG_PASSWORD=password
   PG_PORT=5432
   PORT=3000
   JWT_SECRET=mi_secret_password

4. Inicia el servidor:

   node index.js

   El servidor estará disponible en `http://localhost:3000`.

## Uso

### Autenticación

- **Login**: Para obtener un token JWT, realiza una solicitud POST a `/api/login` con un cuerpo JSON que contenga `correo` y `contrasenia`.

  {
      "correo": "usuario@example.com",
      "contrasenia": "password123"
  }

  Respuesta:

  {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
          "id": 1,
          "correo": "usuario@example.com",
          "rol": 1
      }
  }


### Rutas Disponibles

#### Usuarios

- **Crear un usuario**: `POST /api/user/`
- **Obtener un usuario por ID**: `GET /api/user/{id}`
- **Actualizar un usuario**: `PUT /api/user/{id}`

#### Estudiantes

- **Crear un estudiante**: `POST /api/student/`
- **Obtener un estudiante por ID**: `GET /api/student/{id}`
- **Actualizar un estudiante**: `PUT /api/student/{id}`

#### Docentes

- **Crear un docente**: `POST /api/teacher/`
- **Obtener un docente por ID**: `GET /api/teacher/{id}`
- **Actualizar un docente**: `PUT /api/teacher/{id}`

#### Tutores

- **Crear un tutor**: `POST /api/tutor/`
- **Obtener un tutor por ID**: `GET /api/tutor/{id}`
- **Actualizar un tutor**: `PUT /api/tutor/{id}`

#### Directores

- **Crear un director**: `POST /api/director/`
- **Obtener un director por ID**: `GET /api/director/{id}`
- **Actualizar un director**: `PUT /api/director/{id}`

## Documentación

Puedes acceder a la documentación interactiva de la API en `http://localhost:3000/api-docs`. Esta documentación está generada con Swagger y proporciona detalles sobre cada endpoint, los parámetros requeridos y las respuestas esperadas.
