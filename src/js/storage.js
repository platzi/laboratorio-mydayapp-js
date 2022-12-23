// This file handles the persistance in localStorage

/**
 * @typedef {Object} Task
 * @property {number} id
 * @property {string} title
 * @property {boolean} completed
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
 * Edits the title of a task
 * @param {string} newTitle 
 * @param {number} editTaskId 
 */
export function updateTaskTitle(newTitle, editTaskId) {
   let tasks = getTasks()

   let indexToEdit = tasks.findIndex(task => task.id == editTaskId);
   tasks[indexToEdit].title = newTitle;

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