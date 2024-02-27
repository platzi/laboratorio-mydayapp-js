import "./css/base.css";
import * as node from "./js/nodes.js";

function saveTodos() {
  let textToSave = [];
  let todoListsArr = document.querySelectorAll(".todo-list li");
  todoListsArr.forEach((element) => {
    const label = element.querySelector(".view label");
    const state = element.classList;

    const todoObj = {
      label: label.textContent,
      state: state.value ? true : false,
    };

    textToSave.push(todoObj);
  });

  return textToSave;
}
// LocalStorage(LS)
function saveTodoToLS() {
  let dataToSave = saveTodos();
  let dataToLS = JSON.stringify(dataToSave);
  return dataToLS;
}

function retrieveLS() {
  let todosData = localStorage.getItem("mydayapp-js");
  return todosData ? JSON.parse(todosData) : [];
}

let retrievedTodos = retrieveLS();
if (retrievedTodos) {
  retrievedTodos.forEach((element) => {
    createTodo(element.label, element.state);
  });
}

function checkTodoTask(element) {
  const pendingTaskCounter = document.querySelector(".todo-count strong");
  const totalTask = document.querySelectorAll(".todo-list li");
  const pendingTask = document.querySelectorAll(".todo-list .completed");
  pendingTaskCounter.textContent = totalTask.length - pendingTask.length;
  localStorage.setItem("mydayapp-js", saveTodoToLS());
  const childrenArray = Array.from(element.children);
  if (childrenArray.length > 0) {
    unhideMainAndFooter();
  } else {
    hideMainAndFooter();
  }
}

function hideMainAndFooter() {
  node.main.classList.add("hidden");
  node.footer.classList.add("hidden");
}

function unhideMainAndFooter() {
  node.main.classList.remove("hidden");
  node.footer.classList.remove("hidden");
}

window.document.addEventListener(
  "DOMContentLoaded",
  checkTodoTask(node.todoList)
);

// feat adding new task
const newTodoInput = document.querySelector(
  "body > section > header > div > input"
);

function addNewTodo(todo) {
  if (newTodoInput.value.trim() !== "") {
    createTodo(todo);
    newTodoInput.value = "";
    checkTodoTask(node.todoList);
  } else {
    return;
  }
}

newTodoInput.addEventListener("keydown", (e) => {
  const newTodoText = newTodoInput.value;
  if (e.key === "Enter") {
    addNewTodo(newTodoText);
  }
});
function createTodo(title, isComplete = false) {
  let label = title.trim();

  const list = document.createElement("li");
  const todoContainer = document.createElement("div");
  const toggleInput = document.createElement("input");
  const labelElement = document.createElement("label");
  const deleteButton = document.createElement("button");
  const editInput = document.createElement("input");

  todoContainer.classList.add("view");
  toggleInput.classList.add("toggle");
  toggleInput.type = "checkbox";
  labelElement.textContent = label;
  deleteButton.classList.add("destroy");
  editInput.classList.add("edit");
  editInput.value = label;

  if (isComplete) {
    list.classList.add("completed");
    toggleInput.checked = true;
  }

  todoContainer.append(toggleInput, labelElement, deleteButton);
  list.append(todoContainer, editInput);

  node.todoList.append(list);

  toggleInput.addEventListener("click", () => {
    if (toggleInput.checked) {
      list.classList.add("completed");
    } else {
      list.classList.remove("completed");
    }
  });

  labelElement.addEventListener("click", (e) => {
    if (!list.classList.contains("editing")) {
      list.classList.add("editing");
      editInput.focus();
    }
  });

  document.addEventListener("click", (e) => {
    if (!labelElement.contains(e.target)) {
      list.classList.remove("editing");
    }
  });

  deleteButton.addEventListener("click", () => {
    list.remove();
  });
  editInput.addEventListener("keydown", (e) => {
    const newTodo = editInput.value.trim();
    if (newTodo.length > 0 && e.key === "Enter") {
      labelElement.textContent = newTodo.trim();
      list.classList.remove("editing");
    } else if (e.key === "Enter") {
      list.classList.remove("editing");
      editInput.value = labelElement.textContent.trim();
    }
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      list.classList.remove("editing");
      editInput.value = labelElement.textContent.trim();
    }
  });

  localStorage.setItem("mydayapp-js", saveTodoToLS());
}

setInterval(() => {
  checkTodoTask(node.todoList);
}, 500);
