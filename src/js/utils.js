export const init = document.addEventListener("DOMContentLoaded", () => {
  const newTaskInput = document.querySelector(".new-todo");
  const taskList = document.querySelector(".todo-list");
  const taskCount = document.querySelector(".todo-count");
  const clearCompletedBtn = document.querySelector(".clear-completed");
  const tasksCompletedLi = document.querySelector(".completedBtn");
  const tasksPendingLi = document.querySelector(".pendingBtn");
  const tasksAllLi = document.querySelector(".selected");

  // Arry de tareas
  let tasks = [];

  // Si existen tareas, cargarlas desde LocalStorage
  if (localStorage.getItem("mydayapp-js")) {
    tasks = JSON.parse(localStorage.getItem("mydayapp-js"));
    renderTasks();
  }

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
        tasks.push(newTask);
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

  // Render de la lista de tareas
  function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task) => {
      const taskItem = document.createElement("li");
      // console.log(taskItem);

      if (task.completed) {
        taskItem.classList.add("completed");
      } else {
        taskItem.classList.add("pending");
      }

      const divItem = document.createElement("div");
      divItem.classList.add("view");

      const checkbox = document.createElement("input");
      checkbox.setAttribute("type", "checkbox");
      checkbox.classList.add("toggle");
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", () => {
        task.completed = !task.completed;
        renderTasks();
        saveTasks();
      });

      const label = document.createElement("label");
      label.textContent = task.title;

      label.addEventListener("dblclick", () => {
        taskItem.classList.remove("completed");
        taskItem.classList.add("editing");

        const editInput = document.createElement("input");
        editInput.value = task.title;
        editInput.classList.add("edit");
        editInput.focus();

        taskItem.innerHTML = "";
        taskItem.appendChild(editInput);

        editInput.addEventListener("keydown", (event) => {
          if (event.key === "Enter") {
            const newTitle = editInput.value.trim();
            if (newTitle !== "") {
              task.title = newTitle;
              taskItem.classList.remove("editing");
              renderTasks();
              saveTasks();
            }
          } else if (event.key === "Escape") {
            taskItem.classList.remove("editing");
            renderTasks();
          }
        });
      });

      const destroyBtn = document.createElement("button");
      destroyBtn.classList.add("destroy");
      destroyBtn.addEventListener("click", () => {
        tasks = tasks.filter((t) => {
          return t.id !== task.id;
        });
        renderTasks();
        saveTasks();
      });

      taskItem.appendChild(divItem);
      divItem.appendChild(checkbox);
      divItem.appendChild(label);
      divItem.appendChild(destroyBtn);
      taskList.appendChild(taskItem);
    });
    updateInterface();
  }

  // Actualizar la interfaz
  function updateInterface() {
    if (tasks.length === 0) {
      document.querySelector(".main").style.display = "none";
      document.querySelector(".footer").style.display = "none";
    } else {
      document.querySelector(".main").style.display = "block";
      document.querySelector(".footer").style.display = "block";
    }

    const pendingTasks = tasks.filter((task) => {
      return !task.completed;
    });

    tasksPendingLi.addEventListener("click", () => {
      taskList.innerHTML = "";
      tasksCompletedLi.classList.remove("selected");
      tasksAllLi.classList.remove("selected");
      tasksPendingLi.classList.add("selected");

      // console.log(pendingTasks);
      pendingTasks.forEach((task) => {
        const taskPending = document.createElement("li");
        // console.log(taskPending);

        if (task.completed) {
          taskPending.classList.add("completed");
        } else {
          taskPending.classList.add("pending");
        }

        const divItem = document.createElement("div");
        divItem.classList.add("view");

        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.classList.add("toggle");
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => {
          task.completed = !task.completed;
          renderTasks();
          saveTasks();
        });

        const label = document.createElement("label");
        label.textContent = task.title;

        label.addEventListener("dblclick", () => {
          taskPending.classList.remove("completed");
          taskPending.classList.add("editing");

          const editInput = document.createElement("input");
          editInput.value = task.title;
          editInput.classList.add("edit");
          editInput.focus();

          taskPending.innerHTML = "";
          taskPending.appendChild(editInput);

          editInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              const newTitle = editInput.value.trim();
              if (newTitle !== "") {
                task.title = newTitle;
                taskPending.classList.remove("editing");
                renderTasks();
                saveTasks();
              }
            } else if (event.key === "Escape") {
              taskPending.classList.remove("editing");
              renderTasks();
            }
          });
        });

        const destroyBtn = document.createElement("button");
        destroyBtn.classList.add("destroy");
        destroyBtn.addEventListener("click", () => {
          tasks = tasks.filter((t) => {
            return t.id !== task.id;
          });
          renderTasks();
          saveTasks();
        });

        taskPending.appendChild(divItem);
        divItem.appendChild(checkbox);
        divItem.appendChild(label);
        divItem.appendChild(destroyBtn);
        taskList.appendChild(taskPending);
      });
      const taskCountText = pendingTasks.length === 1 ? "1 tarea pendiente" : `${pendingTasks.length} tareas pendientes`;
      taskCount.textContent = taskCountText;
    });

    const completedTasks = tasks.filter((task) => {
      return task.completed;
    });

    tasksCompletedLi.addEventListener("click", () => {
      taskList.innerHTML = "";
      tasksPendingLi.classList.remove("selected");
      tasksAllLi.classList.remove("selected");
      tasksCompletedLi.classList.add("selected");
      completedTasks.forEach((task) => {
        const taskCompleted = document.createElement("li");
        // console.log(taskCompleted);

        if (task.completed) {
          taskCompleted.classList.add("completed");
        } else {
          taskCompleted.classList.add("pending");
        }

        const divItem = document.createElement("div");
        divItem.classList.add("view");

        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.classList.add("toggle");
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => {
          task.completed = !task.completed;
          renderTasks();
          saveTasks();
        });

        const label = document.createElement("label");
        label.textContent = task.title;

        label.addEventListener("dblclick", () => {
          taskCompleted.classList.remove("completed");
          taskCompleted.classList.add("editing");

          const editInput = document.createElement("input");
          editInput.value = task.title;
          editInput.classList.add("edit");
          editInput.focus();

          taskCompleted.innerHTML = "";
          taskCompleted.appendChild(editInput);

          editInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              const newTitle = editInput.value.trim();
              if (newTitle !== "") {
                task.title = newTitle;
                taskCompleted.classList.remove("editing");
                renderTasks();
                saveTasks();
              }
            } else if (event.key === "Escape") {
              taskCompleted.classList.remove("editing");
              renderTasks();
            }
          });
        });

        const destroyBtn = document.createElement("button");
        destroyBtn.classList.add("destroy");
        destroyBtn.addEventListener("click", () => {
          tasks = tasks.filter((t) => {
            return t.id !== task.id;
          });
          renderTasks();
          saveTasks();
        });

        taskCompleted.appendChild(divItem);
        divItem.appendChild(checkbox);
        divItem.appendChild(label);
        divItem.appendChild(destroyBtn);
        taskList.appendChild(taskCompleted);
      });

      const taskCountText = completedTasks.length === 1 ? "1 tarea completada" : `${completedTasks.length} tareas completadas`;
      taskCount.textContent = taskCountText;
    });

    tasksAllLi.addEventListener("click", () => {
      taskList.innerHTML = "";
      tasksPendingLi.classList.remove("selected");
      tasksCompletedLi.classList.remove("selected");
      tasksAllLi.classList.add("selected");
      renderTasks();
    });

    const taskCountText = taskList.length === 1 ? "1 tarea pendiente" : `${pendingTasks.length} tareas pendientes`;
    taskCount.textContent = taskCountText;

    clearCompletedBtn.addEventListener("click", () => {
      console.log("hola");
      localStorage.setItem("mydayapp-js", JSON.stringify(pendingTasks));
      location.reload();
    });
  }

  //

  // Guardar las tareas en LocalStorage
  function saveTasks() {
    localStorage.setItem("mydayapp-js", JSON.stringify(tasks));
  }
});
