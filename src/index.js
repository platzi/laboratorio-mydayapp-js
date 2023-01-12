import "./css/base.css";
import { newItem } from "./js/newItem";
import { navegation } from "./js/navegationBtn";
import { btnClearCompletedVisible } from "./js/btnClearCompletedVisible";

//Obteniendo elementos del DOM
let newTodo = document.querySelector(".new-todo");
const clearCompleteBtn = document.querySelector(".clear-completed");


//Get de elementos del LocalStorage
const localArrTodo = JSON.parse(localStorage.getItem("mydayapp-js"));
export let todoList = localArrTodo || [];
//Escuchador de envento cuando cargue al HTML para iniciar el render si es que existen elementos en el Local Storage
window.addEventListener('DOMContentLoaded', () => {
  location.hash = "#/all"
  navegation()
  newItem()
})
//Escuchador de evento de la tecla enter para capturar el valor del input, guardarlos y hacerle render
newTodo.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    if (newTodo.value != 0) {
      todoList.push({
        tarea: newTodo.value.trim(),
        completed: false,
        visible: true,
      });
      localStorage.setItem('mydayapp-js', JSON.stringify(todoList));

      newItem();
    } else {
      alert("Write something")
    }
  }

});
clearCompleteBtn.addEventListener("click", () => {
  const completedList = todoList.filter(element => element.completed === false)
  todoList = completedList
  localStorage.setItem('mydayapp-js', JSON.stringify(todoList));
  newItem();

})

btnClearCompletedVisible()
window.addEventListener("hashchange", navegation)
