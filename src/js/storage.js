// This file handles the persistance in localStorage

/**
 * @typedef {Object} Task
 * @property {number} id
 * @property {string} title
 * @property {boolean} completed
*/

/**
 * @typedef {Object} TaskInfo
 * @property {string} [title]
 * @property {boolean} [completed]
*/

/**
 * Updates the entire tasks list in localStorage
 * @param {Array<Task>} updatedTasksList 
 */
function updateTasksList(updatedTasksList) {
   localStorage.setItem("mydayapp-js", JSON.stringify(updatedTasksList));
}

/**
 * Gets all the current tasks stored
 * @returns {Array<Task>}
 */
export function getTasks() {
   /** @type {Array<Task>}*/
   let tasksList;

   // Checking if the tasks already exist in localstorage if not creating a new default list
   const stringTasks = localStorage.getItem("mydayapp-js")
   if (stringTasks) {
      tasksList = JSON.parse(stringTasks)
   } else {
      tasksList = [
         {
            id: 0,
            title: "Learn JavaScript",
            completed: true
         },
         {
            id: 1,
            title: "Buy a unicorn",
            completed: false
         },
         {
            id: 2,
            title: "Make dishes",
            completed: false
         }
      ]
      localStorage.setItem("mydayapp-js", JSON.stringify(tasksList));
   }

   return tasksList;
}

/**
 * Adds a new task to the local storage list
 * @param {Task} task 
 */
export function addTask(task) {
   updateTasksList([...getTasks(), task]);
}

/**
 * Edits the title and/or state of a task
 * @param {TaskInfo} newTaskInfo 
 * @param {number} taskId
 */
export function updateTask(newTaskInfo, taskId) {
   debugger
   let tasks = getTasks();

   let indexToEdit = tasks.findIndex(task => task.id == taskId);
   if (typeof newTaskInfo.completed === "boolean") {
      tasks[indexToEdit].completed = newTaskInfo.completed;
   }
   if (newTaskInfo.title) {
      tasks[indexToEdit].title = newTaskInfo.title;
   }

   updateTasksList(tasks);
}

/**
 * Deletes a task by id
 * @param {number} deleteTaskId 
 */
export function deleteTask(deleteTaskId) {
   let tasks = getTasks();

   let listWithDeleted = tasks.filter(task => task.id != deleteTaskId);

   updateTasksList(listWithDeleted);
}

/**
 * Deletes all the tasks completed
 */
export function deleteAllCompletedTasks() {
   let tasks = getTasks();

   let pendingTasksList = tasks.filter(task => task.completed != true);

   updateTasksList(pendingTasksList);
}