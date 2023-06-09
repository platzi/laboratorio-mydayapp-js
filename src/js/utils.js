export const init = document.addEventListener("DOMContentLoaded", () => {
  const newTaskInput = document.querySelector(".new-todo");
  const taskList = document.querySelector(".todo-list");
  const taskCount = document.querySelector(".todo-count");
  const clearCompletedBtn = document.querySelector(".clear-completed");

  let task = [];

  // Añado un evento keydown al input
  newTaskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const taskTitle = newTaskInput.value.trim();
      if (taskTitle !== "") {
        const newTask = {
          id: generateId(),
          title: taskTitle,
          completed: false,
        };
        task.push(newTask);
        newTaskInput.value = "";
        renderTasks();
        saveTasks();
      }
    }
  });

  // Genero id
  function generateId() {
    return Math.random().toString(36).substring(2, 9);
  }
});
