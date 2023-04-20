import "./css/base.css";
import { addTasks } from "./js/addTasks.js";
import { counter } from "./js/counter";
import { btnClearCompleted } from "./js/btnClearCompleted";

//------------------- ADD TAREA -------------------------
const input_new_todo = document.querySelector(".new-todo");
const todoList = document.querySelector(".todo-list");
const btnAll = document.querySelector(".btnAll");
const btnPending = document.querySelector(".btnPending");
const btnCompleted = document.querySelector(".btnCompleted");

window.addEventListener("DOMContentLoaded", Navigation, false);
window.addEventListener("hashchange", Navigation, false);
window.addEventListener("load", () => {
  const savedTasks = localStorage.getItem("mydayapp-js"); //string(representa object en formato JSON )
  if (savedTasks) {
    listTaks = JSON.parse(savedTasks); //parsing OBJECT, sobrescribiendo listTaks
    addTasks(listTaks);
    Navigation(); // update interface de user, according filter
  }
});

export let listTaks = [];

input_new_todo.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    const newInputValue = input_new_todo.value.trim();
    if (newInputValue.length !== 0) {
      listTaks.push({
        name: newInputValue,
        completed: false,
      });
      localStorage.setItem("mydayapp-js", JSON.stringify(listTaks));
      addTasks(listTaks);
      input_new_todo.value = "";
    }
  }
});

function Navigation() {
  if (location.hash.startsWith("#/pending")) {
    const pendingTasks = listTaks.filter((task) => !task.completed);
    addTasks(pendingTasks);
    counter();

    btnPending.classList.add("selected");
    btnCompleted.classList.remove("selected");
    btnAll.classList.remove("selected");
    btnClearCompleted();
  } else if (location.hash.startsWith("#/completed")) {
    const completedTasks = listTaks.filter((task) => task.completed);
    addTasks(completedTasks); //completedTasks=0, <li> NO creado = counter NO actualizado,
    counter(); //actualizar counter

    btnCompleted.classList.add("selected");
    btnPending.classList.remove("selected");
    btnAll.classList.remove("selected");
    btnClearCompleted();
  } else if (location.hash.startsWith("#/all")) {
    addTasks(listTaks);
    btnCompleted.classList.remove("selected");
    btnPending.classList.remove("selected");
    btnAll.classList.add("selected");
    btnClearCompleted();
  }
}
