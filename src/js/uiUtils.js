// This file handles all the ui visual interactions

import { getTasks } from "./storage";
import { checkFilterApplied } from "./utils";

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
export function changeVisualTaskState(taskElement, newState) {
   if (newState != "editing") {
      // Removing the previous class
      taskElement.classList.remove("completed");
   }

   
   // Setting the new one
   // if the new state is pending don't add any new class, just delete the other ones
   if (newState != "pending") {
      taskElement.classList.add(newState);
   }
   taskElement.dataset.taskState = newState;
   checkFilterApplied();
   checkCompletedTasksCount();
}

/**
 * Renders a single task and adds it to the ui
 * @param {import("./storage").Task} task 
 */
export function renderTask(task) {
   const tasksContainer = document.querySelector(".todo-list");

   let taskHTML = `
         <li class="${task.completed ? "completed" : ""}" 
         data-taskid=${task.id} 
         data-task-state="${task.completed == false ? "pending" : "completed"}">
            <div class="view">
               <input class="toggle" type="checkbox" ${task.completed ? "checked" : ""}>
               <label>${task.title}</label>
               <button class="destroy"></button>
            </div>
            <input class="edit" value="${task.title}">
         </li>
      `;

   tasksContainer.insertAdjacentHTML("beforeend", taskHTML);
}

/**
 * Renders the current tasks list
 */
export function renderAllTasks() {
   const tasksList = getTasks()
   const tasksContainer = document.querySelector(".todo-list");

   tasksContainer.innerHTML = "";
   tasksList.forEach(task => {
      renderTask(task)
   });
}

/**
 * Makes the ui to only show the filtered tasks
 * @param {("all" | "completed" | "pending")} filter 
 */
export function filterTasks(filter) {
   const allTaskElements = document.querySelectorAll(".todo-list li");
   const completedTaskElements = document.querySelectorAll('[data-task-state="completed"]');
   const pendingTaskElements = document.querySelectorAll('[data-task-state="pending"]');

   const filterButtons = document.querySelectorAll(".filters li a");
   filterButtons.forEach(button => button.classList.remove("selected"));

   switch (filter) {
      case "all":
         allTaskElements.forEach(taskElement => taskElement.classList.remove("hidden"));

         document.querySelector('[href="#/"]').classList.add("selected");
         break;
      case "pending":
         pendingTaskElements.forEach(taskElement => taskElement.classList.remove("hidden"));
         completedTaskElements.forEach(taskElement => taskElement.classList.add("hidden"));

         document.querySelector('[href="#/pending"]').classList.add("selected");
         break;
      case "completed":
         pendingTaskElements.forEach(taskElement => taskElement.classList.add("hidden"));
         completedTaskElements.forEach(taskElement => taskElement.classList.remove("hidden"));

         document.querySelector('[href="#/completed"]').classList.add("selected");
         break;
      default:
         break;
   }
}

/**
 * Updates the pending tasks counter on the bottom left corner
 */
export function updateTasksCounter() {
   let pendingTasksCount = document.querySelectorAll('[data-task-state="pending"]').length;

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
export function checkTasksCount() {
   let tasksCount = document.querySelectorAll(".todo-list li").length;

   if (tasksCount == 0) {
      hideElement(".main");
      hideElement(".footer");
   } else {
      showElement(".main");
      showElement(".footer");
   }
}

/**
 * Checks if there are completed tasks in order to show the corresponding button to delete them
 */
export function checkCompletedTasksCount() {
   const completedTasksCount = document.querySelectorAll(".todo-list li.completed").length;

   if (completedTasksCount == 0) {
      hideElement("button.clear-completed");
   } else {
      showElement("button.clear-completed");
   }
}