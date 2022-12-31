import "./css/base.css";

import { checkCompletedTasksCount, checkTasksCount, renderAllTasks, updateTasksCounter }  from "./js/uiUtils"
import { checkFilterApplied, initAllTasksEvents, initNewTaskInputListener, initFilterChangeListener, initClearCompletedButton } from "./js/utils";

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
   // Checking if there are completed tasks in order to show the "clear completed" button
   checkCompletedTasksCount();

   /* ************** starting event listeners ************** */
   initAllTasksEvents();
   initNewTaskInputListener();
   initFilterChangeListener();
   initClearCompletedButton();
}

init();