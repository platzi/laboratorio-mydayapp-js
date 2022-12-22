import "./css/base.css";
import {
  addTodo,
  clearCompletedTodos,
  currentTodos,
} from "./js/store.manager.js";
import { createTodoUI, updateUI } from "./js/ui.manager";

const newTodoInput = document.querySelector("input.new-todo");
const todosList = document.querySelector(".todo-list");
const clearCompletedButton = document.querySelector("button.clear-completed");

// ### ### ### ###
// Events
newTodoInput.addEventListener("keydown", (eventKey) => {
  const { key } = eventKey;

  if (key === "Enter") {
    const { value } = newTodoInput;
    const [todo, success] = addTodo(value);

    if (success) {
      todosList.appendChild(createTodoUI(todo));
      newTodoInput.value = "";
      updateUI(currentTodos);
    }
  }
});

clearCompletedButton.addEventListener("click", () => {
  clearCompletedTodos();
  updateUI(currentTodos);
});

document.addEventListener("DOMContentLoaded", () => {
  updateUI(currentTodos);
});
