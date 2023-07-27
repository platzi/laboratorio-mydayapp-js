import "./css/base.css";
import Store from "./js/store";
import View from "./js/view";

const store = new Store("mydayapp-js");
const view = new View();

const filteredTasks = {
  "": store.getTasks,
  pending: store.pendingTasks,
  completed: store.completedTasks,
};
let filter = "";

const controlTasks = function () {
  // 1) Check hash
  const { hash } = location;
  const [_, currentFilter] = hash.split("/");

  filter = currentFilter || "";

  // 2) Render data UI
  view.renderTasks(filteredTasks[filter].call(store), store.count());

  // 3) Update counter
  view.updateCounter(store.pendingTasksSize());
};

const controlAddTask = function (value) {
  // 1) Push value
  store.insert({ title: value });

  // 2) Render data UI
  view.renderTasks(store.getTasks(), store.count());

  // 3) Update counter
  view.updateCounter(store.pendingTasksSize());
};

const controlRemoveTask = function (id) {
  // 1) Remove data
  store.remove(id);

  // 2) Update counter
  view.updateCounter(store.pendingTasksSize(), store.count());
};

const controlToggleTask = function (id) {
  // 1) Update completed state
  store.toggleTask(id);

  // 2) Update counter
  view.updateCounter(store.pendingTasksSize());
};

const controlRemoveCompletedTasks = function () {
  // 1) Remove completed tasks
  store.removeCompletedTasks();

  // 2) Render tasks UI
  view.renderTasks(store.getTasks(), store.count());
};

const init = function () {
  window.addEventListener("load", controlTasks);
  window.addEventListener("hashchange", controlTasks);
  view.handleAddTask(controlAddTask);
  view.handleRemoveTask(controlRemoveTask);
  view.handleToggleTask(controlToggleTask);
  view.handleRemoveCompletedTasks(controlRemoveCompletedTasks);
  view.handleFilterTasks();
};
init();
