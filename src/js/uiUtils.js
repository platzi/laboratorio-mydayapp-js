// This file handles all the ui visual interactions

/**
 * Hides an element using its class or id
 * @param {string} elementSelector 
 */
export function hideElement(elementSelector) {
   let elementToHide = document.querySelector(elementSelector);
   elementToHide.classList.add("hidden");
}

/**
 * Shows a hidden element using its class or id
 * @param {string} elementSelector 
 */
export function showElement(elementSelector) {
   let elementToHide = document.querySelector(elementSelector);
   elementToHide.classList.remove("hidden");
}



/* ********** task related ********** */

/**
 * Changes the visual state of a task element
 * @param {HTMLLIElement} taskElement 
 * @param {("completed" | "pending" | "editing")} newState 
 */
export function changeTaskState(taskElement, newState) {
   taskElement.classList.add(newState);
}

/**
 * Renders the current tasks list
 * @param {import("./storage").Task[]} tasksList
 */
export function renderTasks(tasksList) {
   const tasksContainer = document.querySelector(".todo-list");

   tasksContainer.innerHTML = "";
   tasksList.forEach(task => {
      let taskHTML = `
         <li class="task ${task.completed ? "completed" : "pending"}" data-taskid=${task.id}>
            <div class="view">
               <input class="toggle" type="checkbox" ${task.completed ? "checked" : ""}>
               <label>${task.title}</label>
               <button class="destroy"></button>
            </div>
            <input class="edit" value="${task.title}">
         </li>
      `;

      tasksContainer.insertAdjacentHTML("beforeend", taskHTML);
   });
}

/**
 * Updates the pending tasks counter on the bottom left corner
 */
export function updateTasksCounter() {
   const tasksContainer = document.querySelector(".todo-list");
   let pendingTasksCount = tasksContainer.querySelectorAll(".pending").length;

   const counterElement = document.querySelector(".todo-count");
   counterElement.innerHTML = "";
   if (pendingTasksCount == 1) {
      counterElement.innerHTML = `<strong>${pendingTasksCount}</strong> item left`
   } else {
      counterElement.innerHTML = `<strong>${pendingTasksCount}</strong> items left`
   }
}

/**
 * Checks how many tasks are left, if there is none hides the "main" and "footer" sections
 */
export function checkVisibleTasks() {
   let tasksCount = document.querySelectorAll("task").length;

   if (tasksCount == 0) {
      hideElement(".main");
      hideElement(".footer");
   } else {
      showElement(".main");
      showElement(".footer");
   }
}