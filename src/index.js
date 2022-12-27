import "./css/base.css";

import { renderTasks, updateTasksCounter, changeVisualTaskState }  from "./js/uiUtils"
import { checkFilterApplied, sayHello, initAllTasksEvents } from "./js/utils";
import { getTasks } from "./js/storage";

/**
 * Main function which runs all the application logic
 */
function init() {
   /* ************* Execute on loading ************* */
   // Render the current tasks
   renderTasks();
   // Updating the pending tasks counter
   updateTasksCounter();
   // Checking if any filter should be applied when the application loads
   checkFilterApplied();

   /* ************** starting event listeners ************** */
   initAllTasksEvents();
}

init();