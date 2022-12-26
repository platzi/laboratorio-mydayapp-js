import "./css/base.css";

import { renderTasks, updateTasksCounter, changeTaskState }  from "./js/uiUtils"
import { sayHello } from "./js/utils";
import { getTasks } from "./js/storage";

console.log(sayHello("Hello"));

console.log(getTasks());

// testing functions
renderTasks(getTasks());
updateTasksCounter();