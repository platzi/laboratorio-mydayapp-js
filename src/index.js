import "./css/base.css";
import { addTodo, getFilterByRoute } from "./js/crud.js";

import { getLocalStorage } from "./js/store.js";
import { observeTaskList } from "./js/observers.js";
import {
  addListenerToClearTask,
  addListenerToNavigationHistory,
  addListenerToCreateTask,
  addListenerToFilterButtons,
} from "./js/listeners.js";

function init() {
  observeTaskList();
  let filter = getFilterByRoute();
  let TODOS = getLocalStorage(filter);
  TODOS = Array.from(TODOS);
  TODOS.forEach((element) => {
    addTodo(element);
  });

  // Creates listeners
  addListenerToClearTask();
  addListenerToCreateTask();
  addListenerToFilterButtons();
  addListenerToNavigationHistory();
}

init();
