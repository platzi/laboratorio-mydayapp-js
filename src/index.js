import "./css/base.css";
import { currentTodos, addTodo } from "./js/store.manager.js";
import { createTodoUI } from "./js/ui.manager";

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
};

// ### ### ### ###
// Events
newTodoInput.addEventListener("keydown", (key) => {
  const { keyCode } = key;

  if (keyCode === 13) {
    const { value } = newTodoInput;
    const [todo, success] = addTodo(value);

    if (success) {
      todosList.appendChild(createTodoUI(todo));
      newTodoInput.value = "";
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  showTodos();
});
