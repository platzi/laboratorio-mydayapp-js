import "./css/base.css";
import { v4 as uuidv4 } from "uuid";
import {
  validarListaTareas,
  listernerCheckboxComplete,
  listennerDobleClick,
  contadorFooter,
  quitarTarea,
  getTareas,
  renderizarTarea,
  eliminarTarea,
} from "./js/utils";

//Llamar trae el objeto del local storage
getTareas();
//#1 Ocultar las secciones main y footer
validarListaTareas();
//2 agregar tarea nueva y dejarla en pendiente.
const inputTarea = document.querySelector("#new-todo");

document.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    let inputNuevaTarea = inputTarea.value;
    inputNuevaTarea = inputNuevaTarea.trim();
    inputTarea.value = "";
    if (inputNuevaTarea.length > 0) {
      const objetoTarea = {
        id: uuidv4(),
        title: inputNuevaTarea,
        completed: false,
      };
      const keyTarea = localStorage.getItem("mydayapp-js") || "[]";
      const storageTareas = JSON.parse(keyTarea);
      storageTareas.push(objetoTarea);
      localStorage.setItem("mydayapp-js", JSON.stringify(storageTareas));
      renderizarTarea(inputNuevaTarea, false, objetoTarea.id);
    }
  }
});
//3 marcar tarea como completada al hacer click en el checkbox

listernerCheckboxComplete();
//4 Editar Label despues de dar doble click
listennerDobleClick();
contadorFooter();
//5 Remover tareas completas
quitarTarea();
eliminarTarea();
