import { deleteTask, updateTask } from "./storage";
import {changeVisualTaskState, filterTasks, renderTasks, updateTasksCounter} from "./uiUtils"

/**
 * Checks if any filter is applied and hides the corresponding tasks
 */
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

/**
 * Applies all the necessary event listeners for a task to be interactive
 * @param {HTMLLIElement} taskElement
 */
export function applyTaskEvents(taskElement) {
   const taskId = taskElement.dataset.taskid;

   // Sub-elements
   const checkbox = taskElement.querySelector("input.toggle");
   const label = taskElement. querySelector("label");
   const textInput = taskElement.querySelector("input.edit");
   const destroyButton = taskElement.querySelector("button.destroy");

   // Event handlers
   const checkboxChangeHandler = _ => {
      if (checkbox.checked) {
         changeVisualTaskState(taskElement, "completed");
         updateTask({completed: true}, taskId);
      } else {
         changeVisualTaskState(taskElement, "pending");
         updateTask({completed: false}, taskId);
      }

      updateTasksCounter();
   }

   const editKeyPressHandler = ev => {
      const keyPressed = ev.key;

      if (keyPressed == "Enter") {
         updateTask({title: textInput.value}, taskId);
         label.innerText = textInput.value;
         taskElement.classList.remove("editing");

         textInput.removeEventListener("keydown", editKeyPressHandler);
      }

      if (keyPressed == "Escape") {
         textInput.value = label.innerText;
         taskElement.classList.remove("editing");
         textInput.removeEventListener("keydown", editKeyPressHandler);
      }
   }

   const labelDblClickHandler = _ => {
      changeVisualTaskState(taskElement, "editing");

      textInput.focus();
      textInput.addEventListener("keydown", editKeyPressHandler);
   }

   const destroyTaskHandler = _ => {
      // removing all the event listeners of the task
      checkbox.removeEventListener("change", checkboxChangeHandler);
      label.removeEventListener("dblclick", labelDblClickHandler);
      destroyButton.removeEventListener("click", destroyTaskHandler);

      // removing the task from the local storage list and the ui
      deleteTask(taskId);
      taskElement.remove();
      updateTasksCounter();
   }

   // Event listeners
   checkbox.addEventListener("change", checkboxChangeHandler);
   label.addEventListener("dblclick", labelDblClickHandler);
   destroyButton.addEventListener("click", destroyTaskHandler);
}

/**
 * Applies all the corresponing events to all tasks when the aplication loads
 */
export function initAllTasksEvents() {
   const taskElements = document.querySelectorAll(".task");

   taskElements.forEach(taskElement => applyTaskEvents(taskElement));
}

export const sayHello = (text) => {
  return text;
};
