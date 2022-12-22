import "./css/base.css";
import { addTodo, currentTodos } from "./js/store.manager.js";
import { createTodoUI, updateUI } from "./js/ui.manager";

const newTodoInput = document.querySelector("input.new-todo");
const todosList = document.querySelector(".todo-list");

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

document.addEventListener("DOMContentLoaded", () => {
  updateUI(currentTodos);
});
