import "./css/base.css";

import { renderTasks, updateTasksCounter, changeVisualTaskState }  from "./js/uiUtils"
import { checkFilterApplied, initTaskEvents, sayHello } from "./js/utils";
import { getTasks } from "./js/storage";

/**
 * Main function which runs all the application logic
 */
function init() {
   /* ************* Execute on loading ************* */
   // Getting tasks from localStorage
   let tasks = getTasks();
   // Render the current tasks
   renderTasks(tasks);
   // Updating the pending tasks counter
   updateTasksCounter();
   // Checking if any filter should be applied when the application loads
   checkFilterApplied();

   /* ************** starting event listeners ************** */
   initTaskEvents()
}

init();