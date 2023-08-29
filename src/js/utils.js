export const sayHello = (text) => {
  return text;
};

const mainSection = document.getElementById("main");
const footer = document.getElementById("footer");
const todoList = document.querySelector(".todo-list");
const todoCount = document.querySelector(".todo-count");
const clearButton = document.querySelector(".clear-completed");

export function GetTasks() {
  const TaskList = localStorage.getItem("mydayapp-js");

  if (TaskList) {
    return JSON.parse(TaskList);
  } else {
    return [];
  }
}

export function SetTask(Task) {
  let TasksList = GetTasks();
  if (TasksList.length > 0) {
    TasksList = [...TasksList, Task];
  } else {
    TasksList = [Task];
  }

  SaveTasks(TasksList);
}

function ToggleStateTask(id) {
  const TasksList = GetTasks();
  TasksList.forEach((task) => {
    if (task.id === id) {
      task.completed = task.completed !== true;
    }
  });
  SaveTasks(TasksList);
}

function ChangeTaskTitle(id, title) {
  const TasksList = GetTasks();
  TasksList.forEach((task) => {
    if (task.id === id) {
      task.title = title;
    }
  });
  SaveTasks(TasksList);
}

function DeleteTask(id) {
  const TasksList = GetTasks();
  if (TasksList.length > 1) {
    const NewTasksList = TasksList.filter((task) => task.id !== id);
    SaveTasks(NewTasksList);
  } else {
    TasksList.pop();
    SaveTasks(TasksList);
  }
}

export function CountPendingTasks() {
  const TasksList = GetTasks();

  todoCount.innerHTML = "";

  const numberOfTasks = document.createElement("strong");
  numberOfTasks.innerText = TasksList.filter(
    (task) => task.completed === false
  ).length.toString();

  todoCount.append(numberOfTasks);
  TasksList.filter((task) => task.completed === false).length > 1
    ? (todoCount.innerText += " items left")
    : (todoCount.innerText += " item left");
}

export function ClearCompletedTasks() {
  const TasksList = GetTasks();
  const NewTaskList = TasksList.filter((task) => task.completed === false);
  SaveTasks(NewTaskList);
}

export function ToggleClearButton() {
  const TasksList = GetTasks();
  if (TasksList.filter((task) => task.completed === true).length > 0) {
    clearButton.style.display = "block";
  } else {
    clearButton.style.display = "none";
  }
}

function SaveTasks(Tasks) {
  localStorage.setItem("mydayapp-js", JSON.stringify(Tasks));
  CountPendingTasks();
  ToggleClearButton();
  SetFilters();
}

export function RenderTasks(TaskList) {
  todoList.innerHTML = "";

  mainSection.style.display = "block";
  footer.style.display = "block";
  TaskList.forEach((task) => {
    const taskItem = document.createElement("li");
    const taskView = document.createElement("div");
    taskView.classList.add("view");

    const taskInput = document.createElement("input");
    taskInput.classList.add("toggle");
    taskInput.type = "checkbox";
    task.completed ? (taskInput.checked = true) : (taskInput.checked = false);
    taskInput.addEventListener("click", () => ToggleStateTask(task.id));

    const taskLabel = document.createElement("label");
    taskLabel.innerText = task.title;
    taskLabel.addEventListener("dblclick", () => {
      taskItem.classList.add("editing");
      taskEditInput.value = task.title;
      taskEditInput.focus();
    });

    const taskButton = document.createElement("button");
    taskButton.classList.add("destroy");
    taskButton.addEventListener("click", () => DeleteTask(task.id));

    taskView.append(taskInput, taskLabel, taskButton);

    const taskEditInput = document.createElement("input");
    taskEditInput.classList.add("edit");
    taskEditInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        ChangeTaskTitle(task.id, taskEditInput.value.trim());
        taskItem.classList.remove("editing");
      } else if (e.key === "Escape") {
        taskItem.classList.remove("editing");
      }
    });

    taskItem.append(taskView, taskEditInput);
    todoList.appendChild(taskItem);

    if (task.completed === true) {
      taskItem.classList.add("completed");
    }
  });
}

function ToggleSelectedFilterHighlight(Hash) {
  const elements = document.querySelectorAll(".filters li a");
  elements.forEach((element) => {
    if (element.textContent === Hash.toString()) {
      element.classList.add("selected");
    } else {
      element.classList.remove("selected");
    }
  });
}

export function SetFilters() {
  const CurrentHash = window.location.hash;
  const TasksList = GetTasks();

  if (CurrentHash === "#/all" || CurrentHash === "#/" || CurrentHash === "") {
    if (TasksList.length <= 0) {
      mainSection.style.display = "none";
      footer.style.display = "none";
    } else {
      mainSection.style.display = "block";
      footer.style.display = "block";
      ToggleSelectedFilterHighlight("All");
      RenderTasks(TasksList);
    }
  } else if (CurrentHash === "#/pending") {
    ToggleSelectedFilterHighlight("Pending");
    RenderTasks(TasksList.filter((task) => task.completed === false));
  } else if (CurrentHash === "#/completed") {
    ToggleSelectedFilterHighlight("Completed");
    RenderTasks(TasksList.filter((task) => task.completed === true));
  }
}
