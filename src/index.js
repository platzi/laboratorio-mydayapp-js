import "./css/base.css";
import Store from "./js/store";
import View from "./js/view";

const store = new Store("mydayapp-js");
const view = new View();

const controlTasks = function () {
  // 1) Get data
  const data = store.getTasks();

  // 2) Render data UI
  view.renderTasks(data);

  // 3) Update counter
  view.updateCounter(store.pendingTasksSize());
};

const controlAddTask = function (value) {
  // 1) Push value
  store.insert({ title: value });

  // 2) Render data UI
  view.renderTasks(store.getTasks());

  // 3) Update counter
  view.updateCounter(store.pendingTasksSize());
};

const controlRemoveTask = function (id) {
  // 1) Remove data
  store.remove(id);

  // 2) Update counter
  view.updateCounter(store.pendingTasksSize());
};

const controlToggleTask = function (id) {
  // 1) Update completed state
  store.toggleTask(id);

  // 2) Update counter
  view.updateCounter(store.pendingTasksSize());
};

const init = function () {
  window.addEventListener("load", controlTasks);
  window.addEventListener("hashchange", controlTasks);
  view.handleAddTask(controlAddTask);
  view.handleRemoveTask(controlRemoveTask);
  view.handlerToggleTask(controlToggleTask);
};
init();
