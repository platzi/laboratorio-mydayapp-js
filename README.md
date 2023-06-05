# MyDayApp - JavaScript

MyDayApp es una aplicación para gestionar tareas de forma sencilla, fácil y en donde pondrás a pruebas tus conocimientos en JS.

![preview](https://i.imgur.com/et5mmr7.png)

estas son las funciones que implemente:

### 1. Ocultar las secciones main y footer

- Cuando no hay tareas, los elementos con ID `#main` y `#footer` deberían estar ocultos.

### 2. Crear una nueva tarea.

- Se debe crear una nueva tarea se debe usar el input principal de la aplicación.
- Este input debe enfocarse cuando se cargue la página, preferiblemente utilizando el atributo `autofocus` en el input.
- Al presionar la tecla Enter la tarea se crea con el estado **pending** y se agrega a la lista de tareas y el input debería quedar en limpio.
- Asegúrate de usar métodos como `.trim()` para limpiar espacios al inicio o al final y verifica que la tarea no sea un `string` vacío.

### 3. Una tarea

Una tarea debería tener 3 posibles interacciones:

1. Cuando se haga clic en el checkbox las tareas es marcada como **completed**, de igual manera si se vuele a hacer clic sobre en el checkbox vuelve a su estado de **pending**.
2. Si se hace doble clic en el  `<label>` se activa el modo edición.
3. Si se hace la acción `:hover` en una tarea se debería mostrar el botón para eliminar (`.destroy`).

### 4. Editando una tarea

- Cuando el modo edición está activado, se deberían ocultar los otros elementos y se mostrará un input que contiene el título de la tarea pendiente, que debe estar enfocado (`.focus()`).
- La edición debe guardarse cuando se presione la tecla Enter y salir del modo edición.
- Asegúrate de usar métodos como `.trim()` limpiar espacios al inicio o al final.
- Si se presiona la tecla Escape durante la edición, se debe salir del modo edición y descartar cualquier cambio.

### 5. Contador

- En el footer se debería mostrar el número de tareas en estado **pending**.
- Asegúrese de que el número esté envuelto por una etiqueta `<strong>`.
- También asegúrese de pluralizar la palabra `item` correctamente, por ejemplo: `0 items`, `1 item`, `2 items`.

### 6. Botón de limpiar

- Debería existir un botón para eliminar todas las tareas que están con estado de **completed**.

### 7. Persistencia

- Cuando se recargue la aplicación se debe obtener las tareas, para esto tu aplicación debería guardar las tareas en LocalStorage.
- El key que se debe usar para el LocalStorage debe ser `mydayapp-js`, esto es importante ya que las [pruebas e2e](#pruebas) van a verificar el LocalStorage con esta la key `mydayapp-js`.
- NO es necesario persistir estados de la interfaz como por ejemplo guardar el modo de edición. Solo se debe guardar las tareas.

### 8. Filtros y rutas

Deben existir tres filtros que funcione desde la URL y funcionan como links en el footer:

- `#/all`: Muestra todas las tareas tanto las que están en estado de **completed** y **pending**.
- `#/pending`: Muestra todas las tareas en estado **pending**.
- `#/completed`: Muestra todas las tareas en estado **completed**.

### 9. Deployment

Desplegar la aplicación en alguno de los siguientes servicios: GitHub Pages, Netlify, Vercel, Firebase Hosting.

## Licencia

Este proyecto se lanza bajo la licencia [MIT](https://opensource.org/licenses/MIT).

## Credits

- [TodoMVC Project](https://todomvc.com/).
