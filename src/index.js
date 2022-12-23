import "./css/base.css";
import { addTodo, clearCompletedTodos } from "./js/store.manager.js";
import { createTodoUI, updateUI } from "./js/ui.manager";

const newTodoInput = document.querySelector("input.new-todo");
const todosList = document.querySelector(".todo-list");
const clearCompletedButton = document.querySelector("button.clear-completed");

const filterButtons = [
  document.querySelector('a[href="#/"]'),
  document.querySelector('a[href="#/pending"]'),
  document.querySelector('a[href="#/completed"]'),
];

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

clearCompletedButton.addEventListener("click", () => {
  clearCompletedTodos();
  updateUI();
});

document.addEventListener("DOMContentLoaded", () => {
  updateUI();

  filterButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const { target } = e;
      document.querySelector("a.selected").classList.remove("selected");
      target.classList.add("selected");
    });
  });
});

window.addEventListener("hashchange", () => updateUI());
