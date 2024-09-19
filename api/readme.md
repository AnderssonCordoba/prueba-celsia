# API Celsia Internet

Este proyecto implementa una API para el proceso de venta de servicios de internet de Celsia Internet S.A.S., permitiendo el registro y consulta de información de clientes y sus servicios contratados.

## Requisitos previos

- Node.js (versión 14 o superior)
- npm (normalmente viene con Node.js)
- Docker y Docker Compose (para despliegue en contenedores)
- Docker
- Docker Compose

## Tecnologías utilizadas

- Node.js
- Express.js
- MongoDb

## Configuración

1. Clona este repositorio:
   git clone https://github.com/<repositorio>
   cd celsia-internet-api

2. Instala las dependencias:
   npm install

3. Crea un archivo `.env` en la raíz del proyecto basado en `.env.example` y justa las variables de entorno según sea necesario.

## Desarrollo

Para ejecutar la aplicación en modo de desarrollo:

1. Instala las dependencias:
   npm install

2. Inicia la aplicación:
   npm run dev

## Despliegue

Para desplegar la aplicación:

1. Construye las imágenes de Docker:
   docker-compose build

2. Inicia los contenedores:
   docker-compose up -d

La API estará disponible en `http://localhost:3000`.

## Detener la aplicación

Para detener y eliminar los contenedores:
docker-compose down

## Endpoints principales

- `GET /api/clientes`: Obtener todos los clientes
- `POST /api/clientes`: Crear un nuevo cliente
- `GET /api/clientes/:id`: Obtener un cliente por ID
- `PUT /api/clientes/:id`: Actualizar un cliente
- `DELETE /api/clientes/:id`: Eliminar un cliente
- `GET /api/clientes/:id/servicios`: Obtener los servicios de un cliente

- `GET /api/servicios`: Obtener todos los servicios
- `POST /api/servicios`: Crear un nuevo servicio para un cliente existente
- `GET /api/servicios/cliente/:id`: Obtener servicios por ID de cliente
- `PUT /api/servicios/:id/:servicio`: Actualizar un servicio
- `DELETE /api/servicios/:id/:servicio`: Eliminar un servicio

## Pruebas

Las pruebas se pueden realizar utilizando los scripts de prueba incluidos en la carpeta llamada `src/scripts`.

1. Pruebas cliente:
   clienteScripts.http

2. Pruebas servicio:
   servicioScripts.http

## Notas adicionales

- La base de datos MongoDB se ejecuta en un contenedor separado y es accesible para la aplicación.
- Los logs de la aplicación y la base de datos están configurados para rotar automáticamente, limitando su tamaño y número.
