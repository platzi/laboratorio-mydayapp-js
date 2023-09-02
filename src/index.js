import "./css/base.css";
import { TODOS } from "./js/store";
import { renderTodo, addTodoController, deleteCompletedTodos } from "./js/utils"

(function loadData() {
  TODOS.forEach(TODO => renderTodo(TODO))
})();

const $newTodoInput = document.querySelector(".new-todo")
$newTodoInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTodoController(e.target.value);
    e.target.value = "";
  }
})

const $clearCompletedTodosButton = document.querySelector(".clear-completed");
$clearCompletedTodosButton.addEventListener("click", deleteCompletedTodos)