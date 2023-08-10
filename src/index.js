import "./css/base.css";

import { sayHello } from "./js/utils";

console.log(sayHello("Hello"));

const todosSaved = JSON.parse(localStorage.getItem("todoList"));
const input = document.getElementById("inputTodo");
let todosList = [];
const mainContainer = document.getElementById("main");
const footer = document.getElementById("footer");
const ul = document.getElementById("todoList");

if (todosSaved === null) {
  mainContainer.style.display = "none";
  footer.style.display = "none";
} else {
  showTodos();
}

function showTodos() {
  todosList = [...todosSaved];
  const todos = todosList
    .map((item) => {
      return `
      <li class="view">
        <div class="view">
          <input class="toggle" type="checkbox" />
          <label>${item.title}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value=${item.title} />
      </li>`;
    })
    .join("");

  ul.innerHTML = todos;
}

//verificar si lo que se escribe en el input es una entrada valida:
const verifyInputValue = (event) => {
  const inputValue = event.target.value.trim() === "" ? null : event.target.value.trim();

  if (inputValue === null) {
    alert("por favor, escribe una tarea.");
  } else {
    createTodo(inputValue);
  }
};
input.addEventListener("change", verifyInputValue);

//proceso para guardar los todos en el localStorage:
function createTodo(todo) {
  const newTodo = {
    id: todo,
    title: todo,
    completed: false,
  };

  todosList.push(newTodo);

  const listToString = JSON.stringify(todosList);

  localStorage.setItem("todoList", listToString);
}
