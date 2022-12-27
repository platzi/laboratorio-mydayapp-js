import "./css/base.css";

import { renderTasks, updateTasksCounter, changeTaskState }  from "./js/uiUtils"
import { sayHello } from "./js/utils";
import { getTasks } from "./js/storage";

/**
 * Main function which runs all the application logic
 */
function init() {
   // Getting tasks from localStorage
   let tasks = getTasks();

   // Render the current tasks
   renderTasks(tasks);

   // Updating the pending tasks counter
   updateTasksCounter();


}

init();