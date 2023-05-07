import "./css/base.css";
import { sayHello } from "./js/utils";

let todos = [];

const main = document.querySelector(".main");
const footer = document.querySelector(".footer");
const todoList = document.querySelector(".todo-list");
const newTodo = document.querySelector(".new-todo");
const clearCompleteTodosButton = document.querySelector(".clear-completed");

let totalPendingItems = 0;

console.log(sayHello("Hello"));

getLocalStorage();
showTodoList();
listenForNewTodo();
listenForCleanAllCompletedtodos();

function showInitialInfo() {
  if (!todos.length) {
    main.classList.add("hidden");
    footer.classList.add("hidden");
  } else {
    main.classList.remove("hidden");
    footer.classList.remove("hidden");
  }
}

function showTodoList() {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
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

    todoContainerInput.addEventListener("click", () => {
      listItem.classList.toggle("completed");
      completeTodo(index);
    });

    todoInput.addEventListener("keypress", (event) =>
      saveTodoChange({
        todoIndex: index,
        value: todoInput.value,
        listItem,
        event,
      })
    );

    todoInput.addEventListener("keyup", (event) =>
      cancelTodoChanges(event, listItem)
    );

    todoLabel.addEventListener("dblclick", () => {
      listItem.classList.add("editing");
      todoInput.focus();
    });

    if (todo.completed) {
      listItem.classList.add("completed");
      todoContainerInput.setAttribute("checked", todo.completed);
    }

    todoLabel.appendChild(todoText);
    todoContainer.append(todoContainerInput, todoLabel, todoButton);
    listItem.append(todoContainer, todoInput);

    todoList.appendChild(listItem);
  });
  updatePendingItems();
  showInitialInfo();
  checkCompletedTodos();
  saveLocalStorage();
}

function listenForNewTodo() {
  newTodo.addEventListener("keypress", (event) => {
    if ((event.keyCode === 13 || event.wich === 13) && !!newTodo.value) {
      addNewTodo();
    }
  });
}

function addNewTodo() {
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
  updatePendingItems();
  checkCompletedTodos();
  saveLocalStorage();
}

function saveTodoChange({ todoIndex, value, listItem, event }) {
  if (event.keyCode === 13 || event.wich === 13) {
    todos[todoIndex].title = value.trim();
    listItem.classList.remove("editing");
    showTodoList();
  }
}

function cancelTodoChanges(event, listItem) {
  if (event.keyCode === 27 || event.wich === 27) {
    listItem.classList.remove("editing");
  }
}

function updatePendingItems() {
  const pendingItems = document.querySelector(".todo-count");
  totalPendingItems = todos.filter((todo) => !todo.completed).length;
  const labelItems = totalPendingItems === 1 ? "item left" : "items left";
  pendingItems.innerHTML = `
    <strong>${totalPendingItems}</strong> ${labelItems}
  `;
}

function listenForCleanAllCompletedtodos() {
  checkCompletedTodos();
  clearCompleteTodosButton.addEventListener("click", () => {
    todos = todos.filter((todo) => !todo.completed);
    showTodoList();
  });
}

function checkCompletedTodos() {
  const completedTodos = todos.some((todo) => todo.completed);

  clearCompleteTodosButton.classList.remove("hidden");
  if (!completedTodos) {
    clearCompleteTodosButton.classList.add("hidden");
  }
}

function saveLocalStorage() {
  localStorage.setItem("mydayapp-js", JSON.stringify(todos));
}

function getLocalStorage() {
  const data = JSON.parse(localStorage.getItem("mydayapp-js"));
  if (data) {
    todos = data;
  }
}
