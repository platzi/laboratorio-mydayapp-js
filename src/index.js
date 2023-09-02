import "./css/base.css";
import { addTodoController, deleteCompletedTodos } from "./js/utils"

const $newTodoInput = document.querySelector(".new-todo")
$newTodoInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTodoController(e.target.value);
    e.target.value = "";
  }
})

const $clearCompletedTodosButton = document.querySelector(".clear-completed");
$clearCompletedTodosButton.addEventListener("click", deleteCompletedTodos)