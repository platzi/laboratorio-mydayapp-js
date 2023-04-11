import { $clearCompleted, inputNewTodo } from "./node/node";
import { clearTaskCompleted } from "./UI/ClearTaskCompleted";
import { inputValue } from "./UI/InputValue";
import { renderUI } from "./UI/renderUI";

//compoentes de eventos globales
//evento que esuchca cuando el hash cambia
window.addEventListener("hashchange", renderUI, false);
//evento del boton que limpia las tareas completadas
$clearCompleted.addEventListener("click", clearTaskCompleted);
//Evento del input principal para agregar nuevas tareas
inputNewTodo.addEventListener("keydown", ({ key }) => {
  if (key === "Enter") {
    inputValue(inputNewTodo);
    console.log("he presionado Enter");
  }
});
