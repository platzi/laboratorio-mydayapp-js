import "./css/base.css";
import { sayHello } from "./js/utils";

const todos = [];

const main = document.querySelector(".main");
const footer = document.querySelector(".footer");
const todoList = document.querySelector(".todo-list");
const newTodo = document.querySelector(".new-todo");

console.log(sayHello("Hello"));

showInitialInfo();
showTodoList();
listeForNewTodo();

function showInitialInfo() {
  if (!todos.length) {
    main.classList.add("hidden");
    footer.classList.add("hidden");
  }
}

function showTodoList() {
  todos.forEach((todo, index) => {
    const listItem = document.createElement("li");

    const todoContainer = document.createElement("div");
    todoContainer.classList.add("view");

    const todoContainerInput = document.createElement("input");
    todoContainerInput.classList.add("toggle");
    todoContainerInput.setAttribute("type", "checkbox");
    todoContainerInput.addEventListener("click", () => {
      listItem.classList.toggle("completed");
      completeTodo(index);
    });

    const todoLabel = document.createElement("label");
    todoLabel.addEventListener("dblclick", () =>
      listItem.classList.add("editing")
    );
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

function listeForNewTodo() {
  newTodo.addEventListener("keypress", (event) => {
    if ((event.keyCode === 13 || event.wich === 13) && !!newTodo.value) {
      addNewTodo();
    }
  });
}

function addNewTodo() {
  todoList.innerHTML = "";
  const todoId = (todos.length + 1).toString();
  const newTodoToAdd = {
    id: todoId,
    title: newTodo.value.trim(),
    completed: false,
  };

  todos.push(newTodoToAdd);
  newTodo.value = "";
  showTodoList();
}

function completeTodo(todoIndex) {
  todos[todoIndex].completed = !todos[todoIndex].completed;
}
