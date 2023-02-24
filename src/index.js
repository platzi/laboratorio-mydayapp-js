import {
  mainFooterDisplayValidator,
  generalTodoListGenerator,
} from "./js/utils";
import "./css/base.css";

mainFooterDisplayValidator();

let todos = [];

generalTodoListGenerator(todos);

const newTodoInput = document.querySelector(".new-todo");

let newUserInput = "";

newTodoInput.addEventListener("input", (e) => {
  const userInput = e.target.value.trim();
  newUserInput = userInput;
});

newTodoInput.addEventListener("keypress", (e) => {
  if (e.code === "Enter" || e.code === "NumpadEnter") {
    if (newUserInput.length < 1) return;
    todos.push({ id: todos.length, title: newUserInput, completed: false });
    generalTodoListGenerator(todos);

    e.target.value = "";
    newUserInput = "";
  }
  return;
});
