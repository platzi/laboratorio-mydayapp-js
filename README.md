# TodoApp

TodoApp es una aplicación para gestionar tareas de forma sencilla y fácil y en donde pondrás a pruebas tus conocimientos en JS.

- Instalación
- Configuración
- Funcionalidades
- Pruebas
- Como enviar tu solución
- Licencia

## Instalación

Fork y npm install

## Configuración

El proyecto ya viene con una configuración por defecto, el cual ya incluye empaquetado y una organización sencilla de archivos y carpetas para solo empezar a incorporar las funcionalidades.

### Estructura de carpetas

Debes mantener la estructura de carpetas y archivos de la siguiente manera:

```
├── README.md
├── e2e
│   └── example.spec.js
├── package.json
├── playwright.config.js
├── src
│   ├── css
│   ├── index.html
│   ├── index.js
│   └── js
└── webpack.config.js
```

Puedes agregar tus propios archivos de JavaScript en la carpeta `src/js` en donde podrás crear los archivos que veas necesarios, por ejemplo:

```
js/
├── controllers/
│   └── todos.js
└── models/
    └── todo.js
```

Sin embargo, recuerda que el archivo de JavaScript principal es `src/index.js` en donde podrás importar archivos y estilos usando módulos de ES6+ es decir usando `export` e `import`.

```js
import './css/base.css';

import { sayHello } from './js/app';

console.log(sayHello('Hello'));
```

### HTML Y CSS

Mantén el HTML con el mismo nombre de clases que se está empleando, el cual hacer referencias a  `css/base.css` y el archivo de estilos `base.css` NO se puede editar, si necesitas cambiar en los estilos, cree un nuevo archivo de estilos.

> **Warning**
> Si cambia el nombre de clases o estructura HTML probablemente las pruebas e2e van a fallar, ya que hace referencia específica a esos elementos con esas clases.


### Scrips

```
npm run start
```

```
npm run dev
```

```
npm run build
```

```
npm run e2e
```


## Funcionalidades

Para crear una aplicación de tareas consistente y útil para los usuarios, la aplicación debe cumplir con la siguiente lista de  9 funcionalidades.

### 1. Ocultar main y footer

Cuando no hay tareas, los elementos con id `#main` y `#footer` deberían estar ocultos.
### 2. Crear una nueva tarea.

- Para crear una nueba tarea se debe usar el input principal de la aplicacion.
- Este input debe enfocarse cuando se cargue la página, preferiblemente usando el atributo de entrada `autofocus`.
- Presionar la tecla Enter la tarea se crea como pendiente por defecto y se agrega a la lista de tareas y el input debería quedar en limpio.
- Asegurate de usar métodos como `.trim()` limpiar espacios al inicio o al final y verfique que la tarea no sea un `string` vacio.

### 3. Marcar todas las tareas como completadas.

- Al lado del input hay una fecla que funciona como botón el cual sirve para marcar todas las tareas como completadas.
- Cuando todas las tareas esten marcadas como completadas este butón debe aparecer como activo.
- Si al menos una tarea se marca como incompleta el botón debería estar inactivo.
- Si al menos hay una tarea marcada como completada, debe salir el botón "Clear completed" en el footer el cual permite borrar las tareas ya completadas.
- Si no hay ninguna tarea el botón no debería mostrarse.
- Cuando todas las tareas esten completadas este botón se muestra activo.

### 4. Una tarea

Una tarea debería tener 3 posibles interacciones:

1. Cuando se haga click en el checkbox la tareas es marcada como **completada** de igual manera si se vuele a hacer click sobre en el checkbox vuelve a su estado de **pendiente**.
2. Si se hace doble cick en el  `<label>` se activa el modo edición.
3. Si haces la acción `:hover` en una tarea se debería mostrar el botón para eliminar (`.destroy`).

### 5. Editando una tarea

- Cuando el modo de edición está activado, se deberían ocultar los otros elementos y se mostrará un input que contiene el título de la tarea pendiente, que debe estar enfocado (`.focus()`).
- La edición debe guardarse cuando se presione la tecla Enter y salir del modo edición.
- La edición tambien debería guardarse cuando si se edita el campo y luego se sale del input.
- Asegurate de usar métodos como `.trim()` limpiar espacios al inicio o al final y si la tarea queda como un `string` vacio de considera como un eliminación de la tarea.
- Si se presiona escape durante la edición, se debe dejar el estado de edición y descartar cualquier cambio.

### 6. Contador

- En el footer se debería mostrar el numero de tareas en estado **pendiente**.
- Asegúrese de que el número esté envuelto por una etiqueta `<strong>`.
Displays the number of active todos in a pluralized form. Make sure the number is wrapped by a `<strong>` tag. - También asegúrese de pluralizar la palabra `item` correctamente: `0 items`, `1 item`, `2 items`.

### 7. Clear completed button

Removes completed todos when clicked. Should be hidden when there are no completed todos.

### 8. Persistence

Your app should dynamically persist the todos to localStorage. If the framework has capabilities for persisting data (e.g. Backbone.sync), use that. Otherwise, use vanilla localStorage. If possible, use the keys `id`, `title`, `completed` for each item. Make sure to use this format for the localStorage name: `todos-[framework]`. Editing mode should not be persisted.

### 9. Routing

Routing is required for all implementations. If supported by the framework, use its built-in capabilities. Otherwise, use the  [Flatiron Director](https://github.com/flatiron/director) routing library located in the `/assets` folder. The following routes should be implemented: `#/` (all - default), `#/active` and `#/completed` (`#!/` is also allowed). When the route changes, the todo list should be filtered on a model level and the `selected` class on the filter links should be toggled. When an item is updated while in a filtered state, it should be updated accordingly. E.g. if the filter is `Active` and the item is checked, it should be hidden. Make sure the active filter is persisted on reload.

## Pruebas
