import showTasks from "../adapters/showTasks.adapter";
import taskUseCase from "../useCases/task.useCase";
import { filterUses, clearCompleted } from "../useCases/filter.useCase";
import getHash from "../utility/getHash";
import showFilter from "../adapters/showFilter.adapter";
import { getStorage, setStorage } from "../localStorage/localStorage";

const taskService = new taskUseCase();
const newTodo = document.querySelector(".new-todo");
const btnClear = document.querySelector(".clear-completed");
const main = document.querySelector("#main");
const footer = document.querySelector("#footer");
const todoCount = document.querySelector(".todo-count");

let todoList = [];

function refreshUI() {
  const list = filters(todoList);
  showTasks(list);
  hideFooterMain();
  hideClearBtn();
  taskCount();
}

function addTask(taskList, task) {
  taskService.addTask(taskList, task);
  onChangeTodoListHandler();
  refreshUI();
}

function taskChageState(taskList, id) {
  taskService.chageState(taskList, id);
  onChangeTodoListHandler();
  refreshUI();
}

function deleteTask(taskList, id) {
  taskService.deleteTask(taskList, id);
  onChangeTodoListHandler();
  refreshUI();
}

function editTask(taskList, id, title) {
  taskService.editTask(taskList, id, title);
  onChangeTodoListHandler();
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
  onChangeTodoListHandler();
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
function hideClearBtn() {
  if (todoList.filter((task) => task.completed).length === 0) {
    btnClear.style.display = "none";
    return;
  }
  btnClear.style.display = "block";
}

function taskCount() {
  const itemText = todoList.length > 1 ? "items" : "item";
  todoCount.innerHTML = `<strong>${todoList.length}</strong> ${itemText} left`;
}

function getFromStorage(key) {
  return getStorage(key);
}

function setToStorage(key, value) {
  setStorage(key, value);
}

function onChangeTodoListHandler() {
  setToStorage("mydayapp-js", todoList);
  return true;
}

//add Task Listener
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
});

document.addEventListener("deleteTask", (event) => {
  const { id } = event.detail;
  deleteTask(todoList, id);
});

document.addEventListener("editTask", (event) => {
  const { id, newTitle } = event.detail;
  editTask(todoList, id, newTitle);
});

window.addEventListener("hashchange", () => {
  refreshUI();
});

window.addEventListener("load", () => {
  clearLocation();
  todoList = getFromStorage("mydayapp-js") || [];
  refreshUI();
});

btnClear.addEventListener("click", () => {
  clearTasks(todoList);
});
