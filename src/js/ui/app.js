import showTasks from "../adapters/showTasks.adapter";
import taskUseCase from "../useCases/task.useCase";
import { filterUses, clearCompleted } from "../useCases/filter.useCase";
import getHash from "../utility/getHash";
import showFilter from "../adapters/showFilter.adapter";

const taskService = new taskUseCase();
const newTodo = document.querySelector(".new-todo");
const btnClear = document.querySelector(".clear-completed");
const main = document.querySelector("#main");
const footer = document.querySelector("#footer");
const todoCount = document.querySelector(".todo-count").querySelector("strong");


let todoList = [];

function refreshUI() {
  const list = filters(todoList);
  showTasks(list);
  hideFooterMain();
  taskCount();
}


function addTask(taskList, task) {
  taskService.addTask(taskList, task);
  refreshUI();
}

function taskChageState(taskList, id) {
  taskService.chageState(taskList, id);
  refreshUI();
}

function deleteTask(taskList, id) {
  taskService.deleteTask(taskList, id);
  refreshUI();
}

function editTask(taskList, id, title) {
  taskService.editTask(taskList, id, title);
  refreshUI();
}

function filters(taskList) {
  const filter = getHash();
  showFilter();
  const list = filterUses(taskList, filter);
  return list;
}

function clearTasks(taskList) {
  todoList = clearCompleted(taskList);
  refreshUI();
}

function clearLocation() {
  window.location.hash = "/";
}

function hideFooterMain() {
  if (todoList.length === 0) {
    main.style.display = "none";
    footer.style.display = "none";
    return;
  }
  main.style.display = "block";
  footer.style.display = "block";

}

function taskCount() {
  todoCount.textContent = todoList.length;
}


newTodo.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    if (event.target.value.trim() === "") return;
    const task = event.target.value.trim();
    event.target.value = "";
    addTask(todoList, task);
  }
});

document.addEventListener("stateChanged", (event) => {
  const { id } = event.detail;
  taskChageState(todoList, id);
})

document.addEventListener("deleteTask", (event) => {
  const { id } = event.detail;
  deleteTask(todoList, id);
})

document.addEventListener("editTask", (event) => {
  const { id, newTitle } = event.detail;
  editTask(todoList, id, newTitle);
})

window.addEventListener("hashchange", () => {
  refreshUI();
});

window.addEventListener("load", () => {
  clearLocation();
  refreshUI();
})

btnClear.addEventListener("click", () => {
  clearTasks(todoList);
})

