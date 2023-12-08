import "./css/base.css";
import { newTodo } from "./js/nodes.js";

import { loadState, refreshList, addTodoItems, selectFilter } from "./js/utils.js";

loadState();
refreshList();

newTodo.addEventListener('change', addTodoItems);
window.addEventListener('hashchange', selectFilter, false);
