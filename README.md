# MyDayApp

MyDayApp es una aplicación para gestionar tareas de forma sencilla y fácil y en donde pondrás a pruebas tus conocimientos en JS.

![preview](https://i.imgur.com/et5mmr7.png)

- [Instalación](#instalación)
- [Configuración](#configuración)
- [Funcionalidades](#funcionalidades)
- [Pruebas](#pruebas)
- [Como enviar tu solución](#como-enviar-tu-solución)
- [Licencia](#licencia)

## Instalación

1. Hacer el fork de este proyecto en tu espacio personal
1. Clonar el repositorio desde tu espacio personal en tu computadora
1. Instalar dependencias  con `npm install`
1. Comprobar ambiente te desarrollo con `npm run dev`

---
### Instalación de entorno para pruebas e2e

1. Instalar requerimientos para pruebas e2e `npm run e2e:install`
1. Comprobar que se corran pruebas e2e con `npm run e2e`


## Configuración

El proyecto ya viene con una configuración por defecto, la cual ya incluye empaquetado con *webpack* y una organización sencilla de archivos y carpetas para empezar a incorporar las funcionalidades en JavaScript.

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
├── utils.js
└── store.js
```

Sin embargo, recuerda que el archivo de JavaScript principal es `src/index.js` en donde podrás importar archivos y estilos usando módulos de ES6+ es decir usando `export` e `import`.

```js
import "./css/base.css";

import { sayHello } from "./js/utils";

console.log(sayHello("Hello"));
```

### HTML Y CSS

Debes mantener el HTML con el mismo nombre de clases que se está empleando, el cual hace referencia a `css/base.css`. El archivo `base.css` NO se puede editar, si necesitas cambiar los estilos, crea un nuevo archivo de estilos. Aunque no es necesario para este ejercicio.

> Si cambia el nombre de clases o estructura HTML probablemente las [pruebas e2e](#pruebas) van a fallar, ya que hace referencia específica a esos elementos con esas clases.

Inicialmente, el archivo `src/index.html` tiene un ejemplo de como mostrar las tareas usando varios estilos de acuerdo a los estados:

```html
<ul class="todo-list">
  <!-- These are here just to show the structure of the list items -->
  <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
  <li class="completed">
    <div class="view">
      <input class="toggle" type="checkbox" checked />
      <label>Learn JavaScript</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="Learn JavaScript" />
  </li>
  <li>
    <div class="view">
      <input class="toggle" type="checkbox" />
      <label>Buy a unicorn</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="Buy a unicorn" />
  </li>
  <li class="editing">
    <div class="view">
      <input class="toggle" type="checkbox" />
      <label>Make dishes</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="Make dishes" />
  </li>
</ul>
```

![tasks](https://i.imgur.com/GiBhkwl.png)

Sin embargo esto es solo un ejemplo, si para tu implementación manejas el render desde la logica en JavaScript puedes dejar el elemento `ul` en vacio.

```html
<ul class="todo-list"></ul>
```

### Scrips


- El comando `npm run start` inicia un servidor pequeño de la carpeta de `/dist` que es la carpeta en donde quedan los archivos para producción, recuerda antes de correr este comando asegurarte de correr `npm run build`.
- El comando `npm run dev` genera un servidor en modo desarrollo el cual tiene livereload.
- El comando `npm run build` corre webpack en modo producción y deja los archivos de producción en la carpeta `/dist`.
- El comando `npm run e2e` corre las [pruebas e2e](#pruebas) usando playwright.

## Funcionalidades

Para crear una aplicación de tareas consistente y útil para los usuarios, la aplicación debe cumplir con la siguiente lista de 9 funcionalidades.

El modelo de datos recomendado para una tarea es:

- id: string
- title: string
- completed: boolen

### 1. Ocultar main y footer

- Cuando no hay tareas, los elementos con ID `#main` y `#footer` deberían estar ocultos.

### 2. Crear una nueva tarea.

- Para crear una nueva tarea se debe usar el input principal de la aplicación.
- Este input debe enfocarse cuando se cargue la página, preferiblemente utilizando el atributo de entrada `autofocus`.
- Al Presionar la tecla Enter la tarea se crea como pendiente por defecto y se agrega a la lista de tareas y el input debería quedar en limpio.
- Asegúrate de usar métodos como `.trim()` limpiar espacios al inicio o al final y verifique que la tarea no sea un `string` vacío.

### 3. Una tarea

Una tarea debería tener 3 posibles interacciones:

1. Cuando se haga clic en el checkbox las tareas es marcada como **completada,\* de igual manera si se vuele a hacer clic sobre en el checkbox vuelve a su estado de **pendiente\*\*.
2. Si se hace doble clic en el  `<label>` se activa el modo edición.
3. Si haces la acción `:hover` en una tarea se debería mostrar el botón para eliminar (`.destroy`).

### 4. Editando una tarea

- Cuando el modo de edición está activado, se deberían ocultar los otros elementos y se mostrará un input que contiene el título de la tarea pendiente, que debe estar enfocado (`.focus()`).
- La edición debe guardarse cuando se presione la tecla Enter y salir del modo edición.
- La edición también debería guardarse cuando si se edita el campo y luego se sale del input.
- Asegúrate de usar métodos como `.trim()` limpiar espacios al inicio o al final.
- Si se presiona escape durante la edición, se debe dejar el estado de edición y descartar cualquier cambio.

### 5. Contador

- En el footer se debería mostrar el número de tareas en estado **pendiente**.
- Asegúrese de que el número esté envuelto por una etiqueta `<strong>`.
- También asegúrese de pluralizar la palabra `item` correctamente: `0 items`, `1 item`, `2 items`.

### 6. Botón de limpiar

- Debería existir un botón para eliminar todas las tareas que están con estado de **completada**.

### 7. Persistencia

- Cuando se recargue la aplicación debo obtener las tareas, para esto tu aplicación debería guardar las tareas en localStorage.
- El key que se debe usar para el localStorage debe ser `mydayapp-vanillajs`, esto es importante ya que las pruebas e2e van a verificar con esta `key`.
- NO es necesario persistir estados de la interfaz como por ejemplo guardar el modo de edición. Solo se debe guardar las tareas.

### 8. Filtros y rutas

Deben existir tres filtros que funcione desde la URL y funcionan como links en el footer:

- `#/all`: Muestra todas las tareas tanto las que están en estado de **completadas** y **pendientes**.
- `#/pending`: Muestra todas las tareas en estado **pendiente**.
- `#/completed`: Muestra todas las tareas en estado **completado**.

### 9. Deployment

Desplegar la aplicación en alguno de los siguientes servicios: GitHub Pages, Netlify, Vercel.

## Pruebas

Las pruebas e2e corren bajo playrighth con el comando `npm run e2e` y ya esta incluido como parte de las depencincias del proyecto sin embargo antes de correr el comando asegurate de correr `npm run e2e:install` para instalar los requerimientos de playrighth para correr pruebas.

## Como enviar tu solución

Debes de hacer un "Fork" de este proyecto, revolver los problemas y crear un Pull Request hacia este repositorio.

## Licencia

Este proyecto se lanza bajo la licencia [MIT](https://opensource.org/licenses/MIT).

## Credits

- [TodoMVC Project](https://todomvc.com/).
