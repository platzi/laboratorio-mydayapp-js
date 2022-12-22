import "./css/base.css";
import { addTodo } from "./js/store.manager.js";

const newTodoInput = document.querySelector("input.new-todo");

newTodoInput.addEventListener("keydown", (key) => {
  const { keyCode } = key;

  if (keyCode === 13) {
    const { value } = newTodoInput;
    const [todo, error] = addTodo(value);
    console.log(todo, error);
  }
});
