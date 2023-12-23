import "./css/base.css";

import { TaskManager } from "./js/localStorage";
import { nodes } from "./js/nodes";

const taskManager = new TaskManager();

function navigator() {
  if (location.hash.startsWith("#/completed")) {
    renderTasks(taskManager.getCompletedTasks());
  } else if (location.hash.startsWith("#/pending")) {
    renderTasks(taskManager.getPendingTasks());
  } else {
    renderTasks();
  }
}

function addNewTask(event) {
  const taskTitle = event.target.value.trim();

  if (taskTitle !== "") {
    const randomId = Math.random().toString(36).substr(2, 5);
    taskManager.addTask({
      id: randomId,
      title: taskTitle,
      completed: false,
    });
  }
}

function createTaskNode({ id, title, completed }) {
  const listItem = document.createElement("li");
  const taskDiv = document.createElement("div");
  const taskInput = document.createElement("input");
  const taskLabel = document.createElement("label");
  const deleteTaskButton = document.createElement("button");
  const editTaskInput = document.createElement("input");

  taskDiv.classList.add("view");
  taskInput.type = "checkbox";
  taskInput.classList.add("toggle");
  taskLabel.textContent = title;
  deleteTaskButton.classList.add("destroy");
  editTaskInput.classList.add("edit");
  editTaskInput.setAttribute("value", title);

  taskInput.addEventListener("click", () => {
    if (taskInput.hasAttribute("checked")) {
      taskInput.removeAttribute("checked");
    } else {
      taskInput.setAttribute("checked", "checked");
    }

    taskManager.updateTaskStatus(id);
    renderTasks();
  });

  taskLabel.addEventListener("dblclick", () => {
    listItem.classList.add("editing");
    editTaskInput.focus();
  });

  editTaskInput.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      listItem.classList.remove("editing");
    } else if (event.key === "Enter") {
      taskManager.updateTask(id, event.target.value.trim());
      renderTasks();
    }
  });

  deleteTaskButton.addEventListener("click", () => {
    taskManager.deleteTask(id);
    renderTasks();
  });

  if (completed) {
    listItem.classList.add("completed");
    taskInput.setAttribute("checked", "checked");
  }

  taskDiv.append(taskInput, taskLabel, deleteTaskButton);
  listItem.append(taskDiv, editTaskInput);

  return listItem;
}

function renderTasks(tasks = taskManager.getTasks()) {
  nodes.taskList.innerHTML = "";

  tasks.forEach((task) => {
    const taskItem = createTaskNode(task);
    nodes.taskList.appendChild(taskItem);
  });

  setCounter();
  updateClearButtonVisibility();
}

function setCounter() {
  nodes.counter.innerHTML = "";

  const tasksCount = taskManager.getTasks().length;
  const strongElement = document.createElement("strong");
  let textNode, text;

  text = tasksCount === 1 ? " item left" : " items left";
  strongElement.textContent = tasksCount;
  textNode = document.createTextNode(text);
  nodes.counter.append(strongElement, textNode);
}

function updateClearButtonVisibility() {
  const completedTasks = taskManager.getCompletedTasks();
  if (completedTasks.length > 0) {
    nodes.clearButton.classList.remove("hidden");
  } else {
    nodes.clearButton.classList.add("hidden");
  }
}

nodes.newTaskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addNewTask(event);
    renderTasks();
    nodes.newTaskInput.value = "";
  }
});

nodes.clearButton.addEventListener("click", () => {
  taskManager.deleteCompletedTasks();
  renderTasks();
});

nodes.links.forEach(function (link) {
  link.addEventListener("click", () => {
    const hasSelectedClass = link.classList.contains("selected");

    if (hasSelectedClass) {
      link.classList.remove("selected");
    } else {
      nodes.links.forEach(function (otherLink) {
        otherLink.classList.remove("selected");
      });

      link.classList.add("selected");
    }
  });
});

window.addEventListener("hashchange", navigator, false);

renderTasks();
