# React Table App - Versión 16

Este proyecto está construido en React 16 y tiene como objetivo consumir servicios de una API para mostrar datos en una tabla dinámica. Se utiliza Redux Toolkit para la gestión del estado global y se crean componentes reutilizables que interactúan con la API de manera eficiente.

## Características

- **Gestión de Estado**: Se utiliza Redux Toolkit para el manejo del estado global de la aplicación.
- **Componentización**: La aplicación consta de dos componentes principales (`TableC` y `Header`) que interactúan con la API y presentan los datos de manera dinámica.
- **Llamadas a API Centralizadas**: Los endpoints de la API están gestionados a través de un archivo de constantes, facilitando su mantenimiento y configuración.
- **React Hooks**: Uso de hooks (`useEffect`, `useMemo`, `useCallback`) para manejar las interacciones y renderizado eficiente de componentes.

## Prerequisitos

Antes de iniciar el proyecto, asegúrate de tener las siguientes herramientas instaladas:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/) para la gestión de paquetes.

## Instalación

1. **Clonar el repositorio**:

   ```bash
   git clone https://github.com/tu-usuario/tu-proyecto-react.git
   cd tu-proyecto-react
   ```

2. **Instalar dependencias**: <br>
Ejecuta el siguiente comando para instalar todas las dependencias necesarias:
    ```bash
    npm install
    ```


## Uso
### Iniciar la Aplicación
Para iniciar la aplicación en modo desarrollo, utiliza el siguiente comando:

```bash
npm start
```
La aplicación se ejecutará en `http://localhost:3000`.

#### Comandos de npm
* `npm run dev:` Inicia el proyecto en modo de desarrollo.
* `npm run build:` Construye el proyecto para producción.
* `npm run test:` Ejecuta las pruebas unitarias del proyecto.

## Estructura del Proyecto

La estructura del proyecto se organiza de la siguiente manera:

```plaintext
src/
├── components/
│   ├── Header/
│   │   ├── Header.js
│   │   └── style.css
│   └── Table/
│       ├── TableC.js
│       └── style.css
├── constants/
│   └── index.js
├── redux/
│   ├── store.js
│   └── tableSlice.js
└── App.js
```

### Descripción de Carpetas y Archivos

- **`components/`**: Contiene los componentes principales (`Header` y `TableC`) utilizados para la vista.
- **`constants/`**: Define las constantes de la API (`FILES_LIST_ENDPOINT`, `FILES_DATA_ENDPOINT`).
- **`redux/`**: Configura la gestión del estado global de la aplicación con Redux Toolkit.
- **`App.js`**: Punto de entrada principal de la aplicación.


### Configuración de Endpoints
Los endpoints de la API están centralizados en un archivo `constants/index.js` para facilitar su gestión y actualización. A continuación se muestra la configuración de los endpoints:

Archivo constants/index.js

```javascript
// URL base para la API
export const API_URL = 'http://localhost:4000';

// Otros endpoints
export const FILES_LIST_ENDPOINT = `${API_URL}/v1/files/list`;
export const FILES_DATA_ENDPOINT = `${API_URL}/v1/files/data`;
```