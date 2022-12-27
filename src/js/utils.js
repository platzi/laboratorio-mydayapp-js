import { updateTask } from "./storage";
import {changeVisualTaskState, filterTasks, updateTasksCounter} from "./uiUtils"

export function checkFilterApplied() {
   let filter = window.location.hash;
   console.log("filter: ", filter);
   if (filter == "#/" || filter == "") {
      filter = "all"
   } else {
      filter = filter.replace("#/","");
   }

   filterTasks(filter);
}

export function initTaskEvents() {
   const taskElements = document.querySelectorAll(".task");

   taskElements.forEach(taskElement => {
      const taskId = taskElement.dataset.taskid;

      // Sub-elements
      const checkbox = taskElement.querySelector("input.toggle");

      checkbox.addEventListener("change", _ => {
         if (checkbox.checked) {
            changeVisualTaskState(taskElement, "completed");
            updateTask({completed: true}, taskId);
         } else {
            changeVisualTaskState(taskElement, "pending");
            updateTask({completed: false}, taskId);
         }

         updateTasksCounter();
      })
   });
}

export const sayHello = (text) => {
  return text;
};
