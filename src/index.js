import "./css/base.css";
import { validarListaTareas } from "./js/utils";

// import { sayHello } from "./js/utils";
//#1 Ocultar las secciones main y footer
validarListaTareas();
//2 agregar tarea nueva y dejarla en pendiente.
const inputTarea = document.querySelector("#new-todo");
const listaTareas = document.querySelector("#todo-list");

document.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    let inputNuevaTarea = inputTarea.value;
    inputNuevaTarea = inputNuevaTarea.trim();
    inputTarea.value = "";
    if (inputNuevaTarea.length > 0) {
      const htmlNuevoElemento = `<li>
      <div class="view">
        <input class="toggle" type="checkbox" />
        <label>${inputNuevaTarea}</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="${inputNuevaTarea}" />
    </li>`;
      listaTareas.innerHTML = listaTareas.innerHTML + htmlNuevoElemento;
      validarListaTareas();
    }
  }
});
