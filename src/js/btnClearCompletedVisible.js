import { todoList } from "..";
export function btnClearCompletedVisible() {
  //Obteniendo elementos del DOM
  const clearCompleteBtn = document.querySelector(".clear-completed");
  //filtrando las tareas completadas
  const completedList = todoList.filter(element => element.completed === true);

  //validación si existen tareas
  if (completedList.length != 0) {
    clearCompleteBtn.classList.remove("hidden")
  } else {
    clearCompleteBtn.classList.add("hidden")
  }

}
