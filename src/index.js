import "./css/base.css";
import { router } from "./js/router";
import { addTodoController, deleteCompletedTodos, visibilityToClearCompletedTodos } from "./js/utils"

window.addEventListener('DOMContentLoaded', router);
window.addEventListener('hashchange', router);

const $newTodoInput = document.querySelector(".new-todo")
$newTodoInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTodoController(e.target.value);
    e.target.value = "";
  }
})

const $clearCompletedTodosButton = document.querySelector(".clear-completed");
$clearCompletedTodosButton.addEventListener("click", deleteCompletedTodos);
visibilityToClearCompletedTodos();