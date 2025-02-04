# Task List

    El proyecto de task list es una lista de tareas, donde uno se autentica con un usuario y puede administrar sus tareas, contiene filtros de busqueda por palabras y por estado de la tarea

## Tecnologías Usadas

### Back-end

-   **Laravel**: Framework de PHP para el desarrollo de aplicaciones web. [Documentación oficial](https://laravel.com/docs/11.x/readme)

### Front-end

-   **React**: Biblioteca de JavaScript para construir interfaces de usuario interactivas. [Documentación oficial](https://es.react.dev/)
-   **Vite**: Herramienta de construcción rápida para proyectos modernos de JavaScript. [Documentación oficial](https://vite.dev/)
-   **React Router**: Biblioteca para manejar el enrutamiento en aplicaciones React. [Documentación oficial](https://reactrouter.com/)
-   **MUI (Material-UI)**: Biblioteca de componentes de UI basada en Material Design para React. [Documentación oficial](https://mui.com/joy-ui/getting-started/)

## Instalación

Sigue estos pasos para configurar el proyecto en tu entorno local:

1. **Clona el repositorio**:

    ```Bash

    git clone https://github.com/jotade13/task-list
    cd task-list
    ```

Instalar dependencias del Back

    cd task-list-api
    composer install

Copia el archivo .env.example a .env y configura las variables de entorno necesarias (como la conexión a la base de datos).

    php artisan key:generate
    php artisan migrate

Inicia el servidor de desarrollo:

    frontend

    npm run dev

    Backend
    cd ../php artisan serve

    Accede a la aplicación:

El Back-end estará disponible en http://localhost:8000.

El Front-end estará disponible en http://localhost:3000.

Estructura del Proyecto
task-list-api/: Contiene el código fuente del Back-end desarrollado con Laravel.

task-list/: Contiene el código fuente del Front-end desarrollado con React, Vite, React Router y MUI.

Gracias por ver este proyecto, Fue un reto para mi crecimiento como desarrollador
