import "./css/base.css";
import { currentTodos, addTodo } from "./js/store.manager.js";
import { createTodoUI, updateUI } from "./js/ui.manager";

// ### ### ### ###
// Selectors
const newTodoInput = document.querySelector("input.new-todo");
const todosList = document.querySelector(".todo-list");

// ### ### ### ###
// Functions
const showTodos = () => {
  todosList.innerHTML = "";

  currentTodos.forEach((todo) => {
    todosList.appendChild(createTodoUI(todo));
  });

  updateUI();
};

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

      updateUI();
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  showTodos();
});
