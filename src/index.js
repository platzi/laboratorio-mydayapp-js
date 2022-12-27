import "./css/base.css";

import { checkTasksCount, renderAllTasks, updateTasksCounter }  from "./js/uiUtils"
import { checkFilterApplied, initAllTasksEvents, initNewTaskInputListener, initFilterChangeListener } from "./js/utils";

/**
 * Main function which runs all the application logic
 */
function init() {
   /* ************* Execute on loading ************* */
   // Render the current tasks
   renderAllTasks();
   // Updating the pending tasks counter
   updateTasksCounter();
   // Checking if any filter should be applied when the application loads
   checkFilterApplied();

   // Checking if there are tasks available in order to show the footer
   checkTasksCount();

   /* ************** starting event listeners ************** */
   initAllTasksEvents();

   initNewTaskInputListener();

   initFilterChangeListener();
}

init();