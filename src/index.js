import "./css/base.css";
import { sayHello } from "./js/utils";

const todos = [];

const main = document.querySelector(".main");
const footer = document.querySelector(".footer");
const todoList = document.querySelector(".todo-list");

console.log(sayHello("Hello"));

showInitialInfo();
showTodoList();

function showInitialInfo() {
  if (!todos.length) {
    main.classList.add("hidden");
    footer.classList.add("hidden");
  }
}

function showTodoList() {
  todos.forEach((todo) => {
    const listItem = document.createElement("li");

    const todoContainer = document.createElement("div");
    todoContainer.classList.add("view");

    const todoContainerInput = document.createElement("input");
    todoContainerInput.classList.add("toggle");
    todoContainerInput.setAttribute("type", "checkbox");

    const todoLabel = document.createElement("label");
    const todoText = document.createTextNode(todo.title);

    const todoButton = document.createElement("button");
    todoButton.classList.add("destroy");

    const todoInput = document.createElement("input");
    todoInput.classList.add("edit");
    todoInput.setAttribute("value", todo.title);

    if (todo.completed) {
      listItem.classList.add("completed");
      todoContainerInput.setAttribute("checked", todo.completed);
    }

    todoLabel.appendChild(todoText);
    todoContainer.append(todoContainerInput, todoLabel, todoButton);
    listItem.append(todoContainer, todoInput);

    todoList.appendChild(listItem);
  });
}
