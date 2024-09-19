# Frontend Celsia Internet

Este proyecto implementa la interfaz de usuario para el proceso de venta de servicios de internet de Celsia Internet S.A.S., permitiendo la visualización y gestión de información de clientes y sus servicios contratados.

## Requisitos previos

- Node.js (versión 14 o superior)
- npm (normalmente viene con Node.js)
- Docker y Docker Compose (para despliegue en contenedores)
- Docker
- Docker Compose

## Tecnologías utilizadas

- React.js con Vite
- Zustand para manejo de estado
- Bootstrap para estilos
- Axios para peticiones HTTP
- React Router para enrutamiento

## Configuración

1. Clona este repositorio:
   git clone https://github.com/AnderssonCordoba/prueba-celsia.git
   cd webapp

2. Instala las dependencias:
   npm install

3. Crea un archivo `.env` en la raíz del proyecto basado en `.env.producción` y justa las variables de entorno según sea necesario.

## Desarrollo

Para ejecutar la aplicación en modo de desarrollo:

1. Instala las dependencias:
   npm install

2. Inicia la aplicación:
   npm run dev

La aplicación estará disponible en `http://localhost:5173`.

## Construcción

Para construir la aplicación para producción:
npm run build

Los archivos de construcción se generarán en el directorio `dist/`.

## Despliegue con Docker

1. Construye la imagen de Docker:
   docker-compose build

2. Inicia el contenedor:
   docker-compose up -d

La aplicación estará disponible en `http://localhost:80`.

## Detener la aplicación

Para detener y eliminar los contenedores:
docker-compose down

## Componentes principales

- `ClientesList`: Muestra una tabla con la lista de clientes.
- `ClienteDetalle`: Muestra los detalles de un cliente y sus servicios contratados.

## Estado global

El estado de la aplicación se maneja con Zustand y incluye:

- Lista de clientes
- Cliente seleccionado
- Servicios del cliente seleccionado

## Notas adicionales

- La aplicación está configurada para comunicarse con una API backend. Asegúrate de que la API esté en funcionamiento y accesible.
- Los logs de la aplicación están configurados para rotar automáticamente, limitando su tamaño y número.
- Para un despliegue en producción, considera utilizar un servidor web como Nginx o un servicio de hosting especializado en aplicaciones de React.
