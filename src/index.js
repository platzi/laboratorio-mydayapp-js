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
};

const controlAddTask = function (value) {
  // 1) Push value
  store.insert({ title: value });

  // 2) Render data UI
  view.renderTasks(store.getTasks());
};

const controlRemoveTask = function (id) {
  // 1) Remove data
  store.remove(id);
};

const init = function () {
  window.addEventListener("load", controlTasks);
  window.addEventListener("hashchange", controlTasks);
  view.handleAddTask(controlAddTask);
  view.handleRemoveTask(controlRemoveTask);
};
init();
