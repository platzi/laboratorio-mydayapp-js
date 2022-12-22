import "./css/base.css";
import { addTodo } from "./js/store.manager.js";
import { createTodoUI } from "./js/ui.manager";

const newTodoInput = document.querySelector("input.new-todo");
const todosList = document.querySelector(".todo-list");

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
